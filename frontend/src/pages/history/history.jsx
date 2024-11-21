import { useState } from "react";
import { useEffect } from "react";
import { getHistory } from "../../repositories/UserRepository";

export function History() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getHistory().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="bg-primary text-white text-center py-2">
        <h5>Lịch Sử Sự Kiện</h5>
        <p>Theo dõi các sự kiện mới nhất của bạn</p>
      </div>
      <div className="container mx-auto">
        <div className="py-2">
          {data.map((history) => (
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1">Hội thảo Công nghệ 2024</h5>
                  <small>Ngày 22/11/2024</small>
                </div>
                <small className="mb-1">
                  Tham gia hội thảo công nghệ để khám phá các xu hướng mới.
                </small>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
