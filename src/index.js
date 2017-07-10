import * as d3 from 'd3'
import {downloadable} from '../../index'

const drawGraph = (graph) => {
  return (svg) => {
    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const color = d3.scaleOrdinal(d3.schemeCategory20)

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    const drag = d3.drag()
      .on('start', (d) => {
        if (!d3.event.active) {
          simulation.alphaTarget(0.3).restart()
        }
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (d) => {
        d.fx = d3.event.x
        d.fy = d3.event.y
      })
      .on('end', (d) => {
        if (!d3.event.active) {
          simulation.alphaTarget(0)
        }
        d.fx = null
        d.fy = null
      })

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value))

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('stroke', '#fff')
      .attr('stroke-width', '1.5px')
      .attr('fill', (d) => color(d.group))
      .call(drag)

    node.append('title')
      .text((d) => d.id)

    simulation
      .nodes(graph.nodes)
      .on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)
        node
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
      })

    simulation.force('link')
      .links(graph.links)
  }
}

d3.json('./miserables.json', (error, graph) => {
  if (error) {
    throw error
  }

  d3.select('svg')
    .call(drawGraph(graph))
    .call(downloadable().filename('graph'))
})
