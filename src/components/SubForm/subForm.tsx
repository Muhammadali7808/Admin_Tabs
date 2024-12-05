import { Button, Form, Input, Select, Upload, UploadFile } from "antd"
import { initialValuesType } from "../../pages/EditCategory"
import { useGetProducts } from "../../pages/CategoryList/service/query/useGetProducts"
interface formType {
  submit?: (values: any) => void,
  isLoding: boolean,
  isEdit: boolean,
  form?: any
  initialValues?: initialValuesType,
  isSubCategory: boolean
}


export const SubFormCategory = ({ submit, form, isLoding, initialValues, isEdit }: formType) => {

  const { data } = useGetProducts()



  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      name: `${initialValues?.title}`,
      status: "done",
      url: `${initialValues?.image}`,
    },
  ];

  if (initialValues && initialValues?.title == undefined) return <div>Loading...</div>

  return (
    <div>
      {isLoding ? (
        <h1>Loding.....</h1>
      ) : (
        <Form
          initialValues={{ title: initialValues?.title }}
          layout="vertical"
          form={form}
          onFinish={submit}
          style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
        >

          <Form.Item
            label={"Title"}
            name={"parent"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Select>
              {data?.results?.map((item) => (
                <Select.Option key={item.id}>{item.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter category title" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="file"
          >
            <Upload
              beforeUpload={() => false}
              accept="image"
              maxCount={1}
              listType="picture"
              defaultFileList={isEdit ? defaultFileList : []}
            >
              <Button>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
