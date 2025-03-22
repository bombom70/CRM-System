import { ChangeEvent, FC, useState } from 'react';
import { Table, Button, Flex, Input, Space, TableProps, Tag } from 'antd';
import { Roles } from '../../api/profile/types';
import { User, UserFilters } from '../../api/users/types';
import { Link } from 'react-router';
import { ModalDeleteUser } from './ModalDeleteUser';
import { debounce } from '../../shared/debounce';
import { PAGE_SIZE } from '../../shared/constants';
import { Filter } from './Filter';
import { usersApi } from '../../api/users/api';
import { formateDate } from '../../shared/utils';

type ModelType = 'delete' | 'block' | 'roles';

export const UsersTable: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<UserFilters>({});
  const [modelType, setModelType] = useState<ModelType>('block');
  const [deleteUser] = usersApi.useDeleteUserMutation();
  const [changeRole] = usersApi.useChangeRoleMutation();
  const [changeBlockUser] = usersApi.useChangeBlockUserMutation();
  const {
    data: users,
    isLoading,
    isFetching,
  } = usersApi.useGetUsersQuery(filter);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      if (modelType === 'delete') {
        await deleteUser(String(user.id));
      } else if (modelType === 'block') {
        await changeBlockUser({
          userId: String(user.id),
          isBlocked: user.isBlocked,
        });
      } else if (modelType === 'roles') {
        const roles = user.roles?.includes(Roles.ADMIN)
          ? user.roles?.filter((role) => role !== Roles.ADMIN)
          : [...user.roles, Roles.ADMIN];
        await changeRole({ id: String(user.id), roles });
      }
    } catch (error) {
      throw error;
    }
    setIsModalOpen(false);
  };

  const handleOpenModal = (user: User, type: ModelType) => {
    setUser(user);
    setModelType(type);
    setIsModalOpen(true);
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      sorter: () => {
        return 1;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: () => {
        return 1;
      },
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Роли',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles?.map((role) => {
            let color;
            switch (role) {
              case Roles.ADMIN:
                color = 'cyan';
                break;
              case Roles.USER:
                color = 'magenta';
                break;
              case Roles.MODERATOR:
                color = 'orange';
                break;
              default:
                color = '';
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Блокировка',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (_, { isBlocked }) => (isBlocked ? '+' : '-'),
    },
    {
      title: 'Дата регистр',
      dataIndex: 'date',
      key: 'date',
      render: (_, user) => <>{formateDate(user.date)}</>,
    },
    {
      title: '',
      key: 'action',
      render: (_, user) => (
        <Space size="middle">
          <Button color="primary" variant="solid">
            <Link to={`/users/${user.id}`}>Перейти к профилю</Link>
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => handleOpenModal(user, 'delete')}
          >
            Удалить
          </Button>
          <Button
            color="default"
            variant="outlined"
            onClick={() => handleOpenModal(user, 'block')}
          >
            {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </Button>
          <Button
            color="default"
            variant="outlined"
            onClick={() => handleOpenModal(user, 'roles')}
          >
            {user.roles?.includes(Roles.ADMIN)
              ? 'Забрать роль админа'
              : 'Дать роль админа'}
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<User>['onChange'] = (
    pagination,
    _,
    sorter
  ) => {
    const newFilters: UserFilters = {};

    if ('order' in sorter) {
      const sortOrder = sorter?.order === 'descend' ? 'desc' : 'asc';
      const sortBy = sorter.columnKey ? sorter.columnKey : 'id';
      newFilters.sortOrder = sortOrder;
      newFilters.sortBy = String(sortBy);
    }

    newFilters.limit = PAGE_SIZE;
    newFilters.offset = pagination.current ? pagination.current - 1 : 0;
    setFilter((prev) => ({ ...prev, ...newFilters }));
  };

  const handleChange = debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setFilter((prev) => ({
      ...prev,
      search: target.value,
      limit: PAGE_SIZE,
      offset: 0,
    }));
  }, 500);

  const handleChangeStatusFilter = (isBlocked: boolean | null) => {
    setFilter((prev) => ({ ...prev, isBlocked }));
  };

  return (
    <Flex vertical align="end" gap={12}>
      <Flex gap={20}>
        <Input
          placeholder="Поиск по имени или email"
          onChange={handleChange}
          style={{ width: 400 }}
        />
        <Filter onSelectFilter={handleChangeStatusFilter} />
      </Flex>
      <Table<User>
        columns={columns}
        dataSource={users?.data}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        style={{ width: '100%' }}
        pagination={
          (users?.meta.totalAmount ?? 0) > PAGE_SIZE && {
            pageSize: PAGE_SIZE,
            current: currentPage,
            total: users?.meta.totalAmount,
            onChange: (page) => {
              setCurrentPage(page);
            },
          }
        }
        loading={isLoading || isFetching}
      />
      <ModalDeleteUser
        isOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </Flex>
  );
};
