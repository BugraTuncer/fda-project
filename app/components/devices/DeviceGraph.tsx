import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { FdaDeviceListItem } from "~/types/fdaDeviceList";

interface DeviceGraphProps {
  mainDevice: FdaDeviceListItem | null;
  relatedDevices: FdaDeviceListItem[];
}

interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  isMainDevice?: boolean;
  fx?: number;
  fy?: number;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: string | SimulationNode;
  target: string | SimulationNode;
}

const DeviceGraph: React.FC<DeviceGraphProps> = ({
  mainDevice,
  relatedDevices,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const mainNodeRadius = 45;
  const relatedNodeRadius = 35;

  const drag = (simulation: d3.Simulation<SimulationNode, undefined>) => {
    const dragstarted = (
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    const dragged = (
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) => {
      d.fx = event.x;
      d.fy = event.y;
    };
    const dragended = (
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) => {
      if (!event.active) simulation.alphaTarget(0);
    };
    return d3
      .drag<SVGGElement, SimulationNode>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  useEffect(() => {
    if (!mainDevice || !svgRef.current) return;

    const nodes: SimulationNode[] = [];
    const links: { source: string; target: string }[] = [];

    nodes.push({
      id: mainDevice.k_number,
      name: mainDevice.device_name || mainDevice.k_number,
      isMainDevice: true,
      fx: 400,
      fy: 300,
    });

    relatedDevices.forEach((device) => {
      nodes.push({
        id: device.k_number,
        name: device.device_name || device.k_number,
      });
      links.push({ source: mainDevice.k_number, target: device.k_number });
    });

    const width = 800;
    const height = 600;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, width, height].join(" "))
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("display", "block")
      .style("margin", "auto")
      .style("background-color", "#f8f9fa");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<SimulationNode, SimulationLink>(links as any)
          .id((d) => d.id)
          .distance(220)
          .strength(0.4)
      )
      .force("charge", d3.forceManyBody().strength(-700))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) =>
            (d as SimulationNode).isMainDevice
              ? mainNodeRadius + 5
              : relatedNodeRadius + 5
          )
      );

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", mainNodeRadius / 2 + 14)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#444");

    const linkElements = svg
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.7)
      .selectAll("line")
      .data(links as SimulationLink[])
      .join("line")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#arrowhead)");

    const nodeElements = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "grab")
      .call(drag(simulation) as any);

    nodeElements
      .append("circle")
      .attr("r", (d) => (d.isMainDevice ? mainNodeRadius : relatedNodeRadius))
      .attr("fill", (d) => (d.isMainDevice ? "#B35097" : "#5c9aff"))
      .attr("stroke", (d) => (d.isMainDevice ? "#863d70" : "#4a7ac2"))
      .attr("stroke-width", 3);

    nodeElements
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "11px")
      .style("pointer-events", "none")
      .selectAll("tspan")
      .data((d) => {
        const name = d.name || "N/A";
        const words = name.split(/[\s-]+/);
        const lines: string[] = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
          if (
            currentLine.length + words[i].length <
            (d.isMainDevice ? 13 : 10)
          ) {
            currentLine += ` ${words[i]}`;
          } else {
            lines.push(currentLine);
            currentLine = words[i];
          }
        }
        lines.push(currentLine);
        return lines.slice(0, d.isMainDevice ? 4 : 3);
      })
      .join("tspan")
      .attr("x", 0)
      .attr("dy", (d, i, arr) =>
        i === 0 ? `${-(arr.length - 1) * 0.45 + 0.35}em` : "1.0em"
      )
      .text((d) => d);

    nodeElements.append("title").text((d) => `${d.name} (K-Number: ${d.id})`);

    simulation.on("tick", () => {
      linkElements
        .attr("x1", (d) => (d.source as SimulationNode).x!)
        .attr("y1", (d) => (d.source as SimulationNode).y!)
        .attr("x2", (d) => (d.target as SimulationNode).x!)
        .attr("y2", (d) => (d.target as SimulationNode).y!);

      nodeElements.attr("transform", (d) => `translate(${d.x!},${d.y!})`);
    });
  }, [mainDevice, relatedDevices, mainNodeRadius, relatedNodeRadius]);

  if (!mainDevice) {
    return (
      <p className="text-center text-gray-500 my-10">
        Main device data not available for graph.
      </p>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white shadow-lg rounded-lg p-0">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DeviceGraph;
