import { RcFile } from "antd/es/upload";
import { Form, message, Tabs, Button, Input, Space, Card } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { useCreateBrand } from "../CreateCategory/service/useCreateBrands";
import { SubFormCategory } from "../../components/SubForm/subForm";

export const CreateSubCategory: React.FC = () => {
    const [tabs, setTabs] = useState<string>('1');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate } = useCreateBrand();

    const submitCategory = (values: { title: string; image: { file: RcFile } }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Category added successfully!");
                form.resetFields();
                setTabs('2');
            },
            onError: (error) => {
                message.error(`Failed to add category: ${error.message}`);
            },
        });
    };

    const submitSubCategory = (values: { title: string; image: { file: RcFile }; parent: string }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }
        formData.append("parent", values.parent);

        mutate(formData, {
            onSuccess: () => {
                message.success("Subcategory added successfully!");
                form.resetFields();
                navigate('/app/sub-category');
            },
            onError: (error) => {
                message.error(`Failed to add subcategory: ${error.message}`);
            },
        });
    };

    const tabChange = (key: string) => {
        setTabs(key);
    };

    return (
        <Tabs defaultActiveKey="1" activeKey={tabs} onChange={tabChange}>
            <Tabs.TabPane tab="Add Category" key="1">
                <SubFormCategory
                    submit={submitCategory}
                    form={form}
                    isSubCategory={false}
                />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Sub Category" key="2" disabled={tabs === '1'}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ items: [{}] }}
                    onFinish={submitSubCategory}
                >
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Item ${field.name + 1}`}
                                        key={field.key}
                                        extra={<CloseOutlined onClick={() => remove(field.name)} />}
                                    >
                                        <Form.Item label="Name" name={[field.name, "name"]}>
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="List">
                                            <Form.List name={[field.name, "list"]}>
                                                {(subFields, subOpt) => (
                                                    <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                                                        {subFields.map((subField) => (
                                                            <Space key={subField.key}>
                                                                <Form.Item noStyle name={[subField.name, "first"]}>
                                                                    <Input placeholder="First" />
                                                                </Form.Item>
                                                                <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                                            </Space>
                                                        ))}
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => subOpt.add()}
                                                            block
                                                        >
                                                            + Add Sub Item
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Item
                                </Button>
                            </div>
                        )}
                    </Form.List>

                    <Button type="primary" htmlType="submit">
                        Create Subcategory
                    </Button>
                </Form>
            </Tabs.TabPane>
        </Tabs>
    );
};
