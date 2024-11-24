import { useEffect, useState } from "react";
import { getEventUpcoming } from "../../repositories/UserRepository";
export function EventUpComing() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getEventUpcoming().then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      <div className="bg-primary text-white text-center py-2">
        <h5>Lịch Sử Sự Kiện</h5>
        <p> Sự kiện sắp tới của bạn</p>
      </div>
      {data.length === 0 ? (
        <div className="text-center">Không có sự kiện nào sắp tới</div>
      ) : (
        data.map((event) => (
          <div className="container mt-2 mx-auto" key={event.ID}>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <a href="/" className="text-decoration-none text-black">
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text">{event.occasion_date}</p>
                      <p className="card-text">{event.des}</p>
                    </div>
                  </a>
                  <div className="px-2 py-2">
                    <a href="/" className="btn btn-danger">
                      Hủy đăng ký
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
