import React, { useState } from "react";
import _ from 'lodash';
import { useHistory } from "react-router";
import { Table, Pagination, IconButton } from 'rsuite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilIcon } from '@heroicons/react/20/solid'
import { UserPlusIcon } from '@heroicons/react/20/solid'
import { NoSymbolIcon } from '@heroicons/react/20/solid'
import { Column, HeaderCell, Cell } from "rsuite-table";
import  "rsuite-table/dist/css/rsuite-table.css";
import GradientBar from "./common/GradientBar";

const CompaniesHRTable = ({ companyHRArray }) => {
  localStorage.removeItem('companyId');
  localStorage.removeItem('companyName');
  localStorage.removeItem('HRUserId');
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = companyHRArray.filter((v, i) => {
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
            <Column width={150} fixed>
                <HeaderCell>Company Name</HeaderCell>
                <Cell dataKey="companyName" />
            </Column>
            <Column width={150} fixed>
                <HeaderCell>First Name</HeaderCell>
                <Cell dataKey="firstName" />
            </Column>
            <Column width={150} fixed>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
            </Column>
            <Column width={70} fixed>
                <HeaderCell>Status</HeaderCell>
                <Cell dataKey="userState" />
            </Column>
            <Column width={150} fixed>
                <HeaderCell>Phone number</HeaderCell>
                <Cell dataKey="phoneNumber" />
            </Column>
            <Column width={150} fixed>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
            </Column>
            <Column width={100} fixed>
                <HeaderCell>Created On</HeaderCell>
                <Cell dataKey="createdOn" />
            </Column>
            <Column width={100} fixed='right'>
                <HeaderCell>Action</HeaderCell>
                <Cell>
                    {rowData => {
                      const  handleAction = (action) => {
                        if (action === 'edit') {
                          localStorage.setItem('companyId', rowData.companyId);
                          localStorage.setItem('HRUserId', rowData._id);
                          localStorage.setItem('companyName', rowData.companyName);
                          history.push('/editCompanyHRUserProfile')
                        }
                        else if (action === 'block_user'){
                          //localStorage.setItem('companyName', rowData.name);
                          localStorage.setItem('companyHRUserId', rowData.companyId);
                          history.push('/companyHRUsers')
                        } else if (action === 'add') {
                          localStorage.setItem('companyId', rowData._id);
                          localStorage.setItem('companyName', rowData.companyName);                             
                          history.push('/addCompanyHRUser')
                        }
                      }
                        return (
                          
                            <span> 
                              {_.has(rowData,'companyId') ? (
                                <>
                                  <IconButton icon={<PencilIcon color="grey" />} onClick={() => handleAction('edit')} />| 
                                  <IconButton icon={<FontAwesomeIcon icon={NoSymbolIcon} color="red" />} onClick={() => handleAction('block_user')}  /> 
                                </>
                                ) : (
                                  <IconButton icon={<UserPlusIcon color="blue"  />} onClick={() => handleAction('add')} />
                                )}                              
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
              total={companyHRArray.length}
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

export default CompaniesHRTable;
