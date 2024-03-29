import React, { Component } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

const App: React.FC = () => {
  const params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: "string",
    },
    {
      id: 2,
      name: "Длина",
      type: "string",
    },
  ];

  const model: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  };

  return (
    <div className="App">
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const updatedParamValues = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value };
      }
      return paramValue;
    });
    this.setState({ paramValues: updatedParamValues });
  };

  getModel = (): Model => {
    return { paramValues: this.state.paramValues };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={
                paramValues.find((p) => p.paramId === param.id)?.value || ""
              }
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => console.log(this.getModel())}>Get Model</button>
      </div>
    );
  }
}
