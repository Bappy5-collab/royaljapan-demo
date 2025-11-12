"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
const baseurl = process.env.REACT_APP_API_BASE_URL;

function UserList() {
  // const navigate = useNavigate()
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    setError(null);
    
    var userData = JSON.parse(localStorage.getItem("userData")) || null;
    if (userData) {
      var token = userData.token;
      let config = {
        method: "get",
        url: `${baseurl}/api/get-users`,
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.users || []);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response && err.response.status == 401) {
            localStorage.clear();
            window.location.assign("/admin/login");
          } else {
            // Handle other errors (network errors, wrong URL, etc.)
            setError(
              err.response?.data?.message || 
              err.message || 
              "データの取得に失敗しました。APIのURLを確認してください。"
            );
          }
        });
    } else {
      setLoading(false);
      window.location.assign("/admin/login");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="product-card">
          <div className="product-card-title">登録者一覧</div>
          <div className="product-card-items">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px",
                  fontFamily: "hiraginoSansGBW3",
                  fontSize: "16px",
                  color: "#000",
                }}
              >
                Loading...
              </div>
            ) : error ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px",
                  fontFamily: "hiraginoSansGBW3",
                  fontSize: "16px",
                  color: "#FF0000",
                }}
              >
                <p style={{ marginBottom: "20px", textAlign: "center" }}>
                  {error}
                </p>
                <button
                  onClick={getData}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    background: "#7c0026",
                    color: "#fff",
                    border: "1px solid #7c0026",
                    fontFamily: "hiraginoSansGBW6",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  再試行
                </button>
              </div>
            ) : users.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px",
                  fontFamily: "hiraginoSansGBW3",
                  fontSize: "16px",
                  color: "#000",
                }}
              >
                データが見つかりませんでした
              </div>
            ) : (
              <table>
                <thead style={{ backgroundColor: "#F1F3F9" }}>
                  <tr>
                    <td
                      style={{
                        width: "60px",
                        border: "solid 1px",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      No
                    </td>
                    <td
                      style={{
                        width: "80px",
                        border: "solid 1px",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      お名前
                    </td>
                    <td
                      style={{
                        width: "120px",
                        border: "solid 1px",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      ログインID
                    </td>
                    {/* <td  style={{width:"120px", border:"solid 1px", textAlign:"center",  margin:0}}>登録日時</td> */}
                    <td
                      style={{
                        width: "600px",
                        border: "solid 1px",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      URL
                    </td>
                    <td
                      style={{
                        width: "120px",
                        border: "solid 1px",
                        textAlign: "center",
                        margin: 0,
                      }}
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          width: "80px",
                          border: "solid 1px",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          width: "80px",
                          border: "solid 1px",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        {item.username}
                      </td>
                      <td
                        style={{
                          width: "120px",
                          border: "solid 1px",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        {item.email}
                      </td>
                      {/* <td  style={{width:"120px", border:"solid 1px", textAlign:"center",  margin:0}}>登録日時</td> */}
                      <td
                        style={{
                          width: "600px",
                          border: "solid 1px",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >{`https://royaljapan.asia/${item.id}`}</td>
                      <td
                        style={{
                          width: "120px",
                          border: "solid 1px",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        <button
                          onClick={() => router.push(`/admin/user/${item.id}`)}
                          style={{ padding: "5px 15px" }}
                        >
                          {" "}
                          設定{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserList;
