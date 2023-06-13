const fs = require('fs');

function rearrangeNodes(nodes) {
  const nodeMap = new Map();
  const result = [];

  // Step 1: Populate the node map
  for (const node of nodes) {
    node.children = []; // Initialize an empty children array
    nodeMap.set(node.nodeId, node);
  }

  // Step 2: Rearrange the nodes
  for (const node of nodes) {
    if (node.parentId === null) {
      // Step 4a: Root node
      result.push(node);
    } else {
      const parent = nodeMap.get(node.parentId);
      if (parent) {
        // Step 4b: Add node to parent's children array
        if (node.previousSiblingId !== null) {
          // Step 4c: Insert node after previous sibling
          const siblingIndex = parent.children.findIndex(
            (child) => child.nodeId === node.previousSiblingId
          );
          parent.children.splice(siblingIndex + 1, 0, node);
        } else {
          // Step 4d: First child of the parent
          parent.children.unshift(node);
        }
      }
    }
  }

  return result;
}


// Read the input file
const input = fs.readFileSync('input/nodes.json');
const nodesArray = JSON.parse(input);
const result = rearrangeNodes(nodesArray);
const output = JSON.stringify(result, null, 2);
// Write the result
fs.writeFileSync('output/result-tree.json', output);