export const groupNodesByCalculator = (nodes) => {
  return nodes.reduce((acc, node) => {
    const isNodeWithoutCalc = node.calculatorId === null;

    if (isNodeWithoutCalc) {
      const isNodeArrayExists = acc.some((calc) => calc.id === null);
      if (!isNodeArrayExists) return [...acc, { id: null, nodes: [node] }];

      return acc.map((calc) =>
        calc.id === null ? { ...calc, nodes: [...calc.nodes, node] } : calc
      );
    }

    const isExistingCalculatorId = acc.some(
      (calculator) => calculator.id === node.calculatorId
    );

    if (!isExistingCalculatorId)
      return [...acc, { ...node.calculator, nodes: [node] }];

    return acc.map((calc) =>
      calc.id === node.calculatorId
        ? { ...calc, nodes: [...calc.nodes, node] }
        : calc
    );
  }, []);
};
