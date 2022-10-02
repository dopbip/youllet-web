import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Table, Pagination, IconButton } from 'rsuite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserLock,
    faLock,
    faUserEdit
  } from '@fortawesome/free-solid-svg-icons';
import { Column, HeaderCell, Cell } from "rsuite-table";
import  "rsuite-table/dist/css/rsuite-table.css";
import GradientBar from "./common/GradientBar";

const SystemUsersTable = ({userArray}) => {

  const history = useHistory()
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = userArray.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
});

  return (
    <>
        <div className="mt-6">
          <GradientBar />
          </div>
          <div >
          <Table
              bordered
              cellBordered
              height={420}
              data={data}
              // onRowClick={data => {
              //     console.log(data)
              // }}
          >
              <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id"/>
              </Column>
              <Column width={120} fixed>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstName" />
              </Column>

              <Column width={120} fixed>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastName" />
              </Column>

              <Column width={200} fixed>
                  <HeaderCell>Email</HeaderCell>
                  <Cell dataKey="email" />
              </Column>

              <Column width={120} fixed>
                  <HeaderCell>Contact</HeaderCell>
                  <Cell dataKey="phoneNumber" />
              </Column>
              
              <Column width={100} fixed>
                  <HeaderCell>Created By</HeaderCell>
                  <Cell dataKey="createdBy" />
              </Column>
              <Column width={100} fixed>
                  <HeaderCell>Created On</HeaderCell>
                  <Cell dataKey="createdOn" />
              </Column>
              <Column width={100} fixed>
                  <HeaderCell>Role</HeaderCell>
                  <Cell dataKey="role" />
              </Column>
              <Column width={100} fixed>
                  <HeaderCell>Status</HeaderCell>
                  <Cell dataKey="userState" />
              </Column>            
              <Column width={100} fixed='right'>
                  <HeaderCell>Action</HeaderCell>
                  <Cell>
                      {rowData => {
                          const  handleAction = (action) => {
                              localStorage.setItem('systemUserId', rowData._id);
                              if (action === 'edit'){
                              history.push('/editSystemUserProfile')
                              }
                              if (action === 'bloc') {

                              }
                          }
                          return (
                              <span>                               
                                  <IconButton icon={<FontAwesomeIcon icon={faUserEdit} color="grey" onClick={() => handleAction('edit')} />}  /> |{" "}
                                  <IconButton icon={<FontAwesomeIcon icon={faUserLock} color="red" />} onClick={() => handleAction('bloc')}  />
                              </span>
                          );
                      }}
                  </Cell>
              </Column>
          </Table>
              <div style={{ padding: 20 }}>
                  <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={['total', '-', 'limit', '|', 'pager']}
                  total={userArray.length}
                  limitOptions={[10, 20]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                  />
              </div>
          </div> 
    </>
  );
};

export default SystemUsersTable;
