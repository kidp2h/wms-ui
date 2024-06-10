import { Enum } from "@/types";
import { Form, Input, InputNumber, Select } from "antd";


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataindex: string;
  title: string;
  inputType: any;
  record: unknown;
  index: number;
  type: EditableCellType;
  values: any;
}


export type EditableCellType = "string" | "number" | "select"

export type ColumnExpand = { type?: EditableCellType, editable?: boolean, values?: Enum }
export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataindex,
  title,
  inputType,
  record,
  index,
  children,
  type,
  values,
  ...restProps
}) => {
  // console.log(restProps);

  let inputNode = null;

  if (type == 'string') {
    inputNode = <Input className="w-full" />
  } else if (type == 'number') {
    inputNode = <InputNumber />
  } else if (type == 'select') {
    // console.log(typeof (editing));

    const options = values?.map((value: any) => ({ value: value, label: value }));

    inputNode = (<Select
      className="w-full"
      options={options}

    />)
  }


  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataindex}
          style={{ margin: 0 }}
          className="m-0 w-full"
          rules={[
            {
              required: true,
              message: ""
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
