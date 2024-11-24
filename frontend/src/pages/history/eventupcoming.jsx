
export function EventUpComing() {
  return (
    <div>
      <div className="bg-primary text-white text-center py-2">
        <h5>Lịch Sử Sự Kiện</h5>
        <p> Sự kiện sắp tới của bạn</p>
      </div>
      <div className="container mt-2 mx-auto">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <a href="#" className="text-decoration-none text-black">
                <div className="card-body">
                  <h5 className="card-title">Sự kiện 1</h5>
                  <p className="card-text">Thời gian: 20/12/2024</p>
                  <p className="card-text">Địa điểm: Thành phố Hồ Chí Minh</p>
                </div>
              </a>
              <a href="#" className="btn btn-primary">Hủy đăng ký</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
