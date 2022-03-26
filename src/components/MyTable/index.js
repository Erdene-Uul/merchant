/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { Table, message } from "antd";
import styled from "styled-components";

const MyTable = React.forwardRef(({
  dataSource,
  loadData,
  columns,
  pagination = true,
  limit: initialLimit = 10,
  order,
  filters,
  onTableChange = () => { },
  tableLoading,
  ...rest
}, ref) => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  // const [filters, setFilters] = React.useState(null);

  const [field, setField] = React.useState();
  const [sort, setSort] = React.useState();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(initialLimit);

  const onChange = (pagination, filterData, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    onTableChange(filterData);

    if (sorter && Object.keys(sorter).length && sorter.order) {
      setField(sorter.columnKey);
      setSort(sorter.order === "ascend" ? 1 : -1);
    } else {
      setField(field);
      setSort(sort);
    }
  };

  const reload = React.useCallback(
    async (signal, filter) => {

      // if (loading) {
      //   return;
      // }

      if (!loadData) {
        if (dataSource) {
          setItems(dataSource);
        }
        return;
      };

      setLoading(true);

      const res = await loadData({
        filter: filter || filters || {
          orderName: "startDate",
          orderBy: "sort",
          // [field]  : sort,
          query: "",
          startDate: "",
          endDate: "",
        },
        offset: {
          page: page,
          limit: limit,
        },
        // ...({ ...filters } || {}),
      }, { signal });
      // if (res.message && res.message.type === "error")
      //   message.error(res.message.text);

      let data = res;
      if (Array.isArray(res.rows)) data = res.rows;
      setTotal(res.count);

      setItems(data.length > 0 ? data : []);
      // }
      // setTotal(res.count);

      setLoading(false);
    },
    [filters, limit, loadData, page]
  );

  // React.useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;

  //   reload(signal);

  //   return () => abortController.abort();
  // }, []);


  React.useEffect(() => {
    reload({}, filters);
  }, [filters, limit, loadData, page]);

  React.useEffect(() => {
    setLimit(10);
    setPage(1);
  }, [filters]);

  React.useImperativeHandle(ref, () => ({
    reload(filters) {
      // setFilters(filters);
      // console.log(filters);
      setLimit(10);
      setPage(1);
      reload({}, filters);
    },
  }));

  return (
    <Container className="table-responsive">
      <Table
        style={{ width: "100%" }}
        // size="small"
        bordered
        {...{
          scroll: { x: 1000 },

          // bordered  : true,
          // rowClassName: styles.row,
          // className   : styles.table,
          // size        : "small",
          columns: columnsConvert(columns),
          dataSource: (loadData ? items : dataSource).map((item, index) => ({ ...item, _key: index + 1 })),

          pagination:
          {
            // className      : styles.pagination,
            defaultCurrent: 1,
            showTitle: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
              <span>
                {/* <strong>{range[0]}</strong> into {" "}
                  <strong>{range[1]}</strong>
                  {" "} views */}
                нийт <strong>{total}</strong>
              </span>
            ),
            onChange: (e) => {
              setPage(e);
            },
            total: total,
            pageSize: limit,
            current: page,
          }
          ,
          onChange,
          ...rest,
        }}

        loading={loading || tableLoading}
      />
    </Container>
  );
}
);
const Container = styled.div`
  .ant-pagination {
    display: flex;
    align-items: center;
  }
  margin-top:16px ;
  margin-bottom:16px ;
`;

const columnsConvert = (columns) => {

  let result = [
    {
      dataIndex: "_key",
      title: "№",
      width: 10
    },
    ...columns.map(item => {
      if (item.title && item.title !== "") {
        return { ...item, textWrap: "normal", };
      }
      return item;
    })
  ];

  return result.map(item => (
    {
      ...item,
      render(value) {

        let result = value;

        if (!value) result = "-";
        return item.render ? item.render(result) : result;
      }
    }
  ));
};

export default MyTable;
