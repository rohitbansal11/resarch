import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import Dashboard from "../../../../layouts/Dashboard";
import Mock_Data from "./Mock_Data.json";

const SellerProductsList = () => {
  const [data, setData] = useState(Mock_Data);
  console.log(data, "data");
  const history = useHistory();

  const status = ["Select", "Approved", "Pending", "Decline"];

  const handleSearchStatus = e => {
    let { value } = e.target;

    const filterData = Mock_Data.products.filter(i => {
      return i.status_name.toLowerCase().includes(value.toLowerCase());
    });
    if (value == "Select") {
      setData(Mock_Data);
    } else {
      setData({ products: filterData });
    }
  };

  const searchyName = e => {
    let { value } = e.target;
    const filterdaa = Mock_Data.products.filter(i => {
      return i.fullname.toLowerCase().includes(value.toLowerCase());
    });
    if (value == "") {
      setData(Mock_Data);
    } else if (filterdaa) {
      setData({ products: filterdaa });
    }
  };

  return (
    <Dashboard>
      <div id="content-page" className="container-fluid">
        <div classNameName="row content-body">
          <div classNameName="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-header  w-100 mt-0">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="iq-search-bar w-100 mt-2 p-0">
                      <form action="#">
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 br-1">
                            <div className="searchbox w-100 ">
                              <input
                                type="text"
                                className="text search-input"
                                placeholder="Search Name"
                                onChange={searchyName}
                              />
                              <a className="search-link" href="#">
                                <i className="ri-search-line"></i>
                              </a>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <div className="searchbox w-100 ">
                              <select
                                className="text search-input"
                                onChange={handleSearchStatus}
                              >
                                {status.map(item => (
                                  <option value={item}>{item}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-borderless tbl-server-info">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Shipped at</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Print</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.products.length > 0 ? (
                        data.products.map((li, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{li.fullname}</td>

                            <td>
                              {moment(li.created_at).format("MMM D yyyy h:mmA")}
                            </td>
                            <td>{li.shipping_id}</td>
                            <td>
                              <div className="text-danger">
                                {li.status_name}
                              </div>
                            </td>
                            <td>
                              <Link
                                to={`/seller/products/view/${li.id}`}
                                className="btn btn-secondary"
                              >
                                View
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/seller/products/print_products/${li.id}`}
                                className="btn btn-warning"
                              >
                                Print Invoice
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div>No Data</div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default SellerProductsList;
