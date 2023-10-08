import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineBgColors,
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineFileProtect,
  AiOutlineFolder,
  AiOutlineFolderAdd,
  AiOutlineFontColors,
  AiOutlineHome,
  AiOutlineOrderedList,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineWallet,
  AiOutlineTable,
  AiOutlineSwitcher,
} from "react-icons/ai";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="fs-5 text-center text-white py-3 mb-0">
            <span className="sm-logo">DC</span>
            <span className="lg-logo">Dev Corner</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUserAdd className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineFileAdd className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineFileProtect className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <AiOutlineFolderAdd className="fs-5" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineFolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <AiOutlineCheck className="fs-5" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineCheckCircle className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineFontColors className="fs-5" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <AiOutlineOrderedList className="fs-5" />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <AiOutlineWallet className="fs-5" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <AiOutlineBell className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <AiOutlineBell className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <AiOutlineBell className="fs-5" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <AiOutlineBell className="fs-5" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "marketing",
              icon: <AiOutlineHome className="fs-5" />,
              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <AiOutlineTable className="fs-5" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <AiOutlineSwitcher className="fs-5" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <AiOutlineOrderedList className="fs-5" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-5" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <AiOutlineBell className="fs-5" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex align-items-center gap-3 dropdown">
              <div className="d-flex flex-column justify-content-center">
                <img
                  width={52}
                  height={52}
                  className="rounded-circle"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTykU2BZtuaSIFXvPHnTJsaL-Z3NgRvA2sA&usqp=CAU"
                  alt="user"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Hassan Musa</h5>
                <p className="mb-0">hassanmusa@gmail.com</p>
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <ToastContainer />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
