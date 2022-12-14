import React, { useState } from "react";
import { useHistory } from "react-router";
import { Table, Pagination, IconButton } from 'rsuite';
import { PencilIcon } from '@heroicons/react/20/solid'
import { UserPlusIcon } from '@heroicons/react/20/solid'

import { Column, HeaderCell, Cell } from "rsuite-table";
import  "rsuite-table/dist/css/rsuite-table.css";
import GradientBar from "./common/GradientBar";

const CompaniesTable = ({ companyArray }) => {
  localStorage.removeItem('companyId');
  localStorage.removeItem('companyName');
  
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  
  const data = companyArray.filter((v, i) => {
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
          <Column width={200} fixed>
              <HeaderCell>Company Name</HeaderCell>
              <Cell dataKey="companyName" />
          </Column>

          <Column width={150} fixed>
              <HeaderCell>Phone Number</HeaderCell>
              <Cell dataKey="contact" />
          </Column>

          <Column width={200} fixed>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
          </Column>

          <Column width={200} fixed>
              <HeaderCell>Address</HeaderCell>
              <Cell dataKey="address" />
          </Column>

          <Column width={100} fixed>
              <HeaderCell>Town</HeaderCell>
              <Cell dataKey="town" />
          </Column>

          <Column width={100} fixed>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
          </Column>

          {/* <Column width={200} fixed>
              <HeaderCell>Created By</HeaderCell>
              <Cell dataKey="createdBy" />
          </Column> */}
          <Column width={95} fixed='right'>
              <HeaderCell>Action</HeaderCell>
              <Cell>
                  {rowData => {
                    const  handleAction = (action) => {
                      if (action === 'edit') {
                        localStorage.setItem('companyName', rowData.companyName);
                        localStorage.setItem('companyId', rowData._id);
                        history.push('/editCompany')
                      }
                      if (action === 'users'){
                        localStorage.setItem('companyName', rowData.companyName);
                        localStorage.setItem('companyId', rowData._id);
                        history.push('/companyUsers')
                      }
                    }
                      return (
                          <span>                               
                               <IconButton icon={<PencilIcon color="grey" />} onClick={() => handleAction('edit')} /> | 
                               <IconButton icon={<UserPlusIcon color="grey" />} onClick={() => handleAction('users')}  />
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
          total={companyArray.length}
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

export default CompaniesTable

