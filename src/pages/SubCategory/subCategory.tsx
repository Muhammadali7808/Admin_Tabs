import { Button, message, Table, Modal, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetSubCategory } from "./service/query/useGetSubCategory";
import { useDeleteItems } from "../CategoryList/service/mutation/useDeleteItems";
import { Link } from "react-router-dom";

export const SubCategory = () => {
  const { data, isLoading } = useGetSubCategory();
  const { mutate } = useDeleteItems();

  const deleteUser = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      onOk: () => {
        mutate(id, {
          onSuccess: () => {
            message.success("Successfully deleted!");
          },
          onError: () => {
            message.error("Failed to delete item.");
          }
        });
      }
    });
  };

  const dataSource = data?.results.map((item) => ({
    key: item.id,
    id: item.id,
    img: item.image,
    title: item.title,
    parent: item.parent?.title
  }));

  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'IMG',
      dataIndex: 'img',
      key: 'img',
      render: (image) => (
        <img
          src={image || 'path/to/placeholder.jpg'}
          alt="category"
          style={{ width: 80, height: 70, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (_, record) => (
        <Space>
          <Link to={`/app/edit/${record.id}`}>
            <Button type="primary" className="action-btn">
              Edit
            </Button>
          </Link>
          <Button onClick={() => deleteUser(record.id)} danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-wrapper">
      <div style={{ marginTop: '20px' }}>
        <Space className="action-space">
          <Link to={'/app/create-sub'}>
            <Button type="primary" size="large" className="create-btn" style={{
              marginBottom: '20px',
            }}>
              Create
            </Button>
          </Link>
        </Space>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};
