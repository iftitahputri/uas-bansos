import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../s.png";

export default function Register() {
  const navigate = useNavigate();

  function handleClick(penerima) {
    setIsPenerima(penerima);
    localStorage.setItem("isPenerima", penerima);
    navigate("/login");
  }

  useEffect(() => {
    const value = localStorage.getItem("isPenerima");
    setIsPenerima(value === "true");
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [isPenerima, setIsPenerima] = useState(true);
  const [isRegisterFailed, setRegisterFailed] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());

  const endpoint = isPenerima
    ? "http://localhost:5000/api/register/penerima"
    : "http://localhost:5000/api/register/penyedia";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const res = await response.json();
      console.error(res.message);
      setRegisterFailed(true);
    }
  } catch (err) {
    console.error("Error:", err);
    setRegisterFailed(true);
  }
};  return (
    <div
      className={`h-[100vh] flex flex-col lg:flex-row hide-scrollbar ${
        isPenerima ? "translate-x-0" : "translate-x-[45vw]"
      } transition-all duration-700 ease-in-out`}
    >
      <div className="bg-white w-[55vw] h-full p-5 hide-scrollbar">
        <div className="flex flex-col items-center">
          <div className=" text-5xl font-extrabold">Daftar</div>
          <div className="mt-3 text-xl text-gray-500 font-semibold">
            Sebagai{" "}
            <span className="text-indigo-700 font-bold">
              {isPenerima ? "Penerima" : "Penyedia"}
            </span>
          </div>
          <div className="mt-5 text-sm">
            Atau{" "}
            <a
              className="text-indigo-300 hover:text-indigo-500"
              onClick={
                isPenerima ? () => handleClick(true) : () => handleClick(false)
              }
            >
              <Link to="/login">masuk ke akun yang sudah ada</Link>
            </a>
          </div>
          <div>
            <form className="flex flex-col m-8" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="role"
                value={isPenerima ? "penerima" : "penyedia"}
                readOnly
              ></input>
              <input
                type="text"
                name={isPenerima ? "nama_penerima" : "nama_penyedia"}
                placeholder="nama"
                required
                className="mb-2 pr-40 pl-3 py-3 shadow-inset focus:border-2 border-black rounded-2xl "
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
              />
              <input
                type="text"
                name={isPenerima ? "no_kk" : "no_organisasi"}
                placeholder={isPenerima ? "Nomor KK" : "Nomor Organisasi"}
                required
                className="mb-2 pr-40 pl-3 py-3  focus:border-2 border-black rounded-2xl "
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
              />
              <input
                type="text"
                name="alamat"
                placeholder="alamat"
                required
                className="mb-2 pr-40 pl-3 py-3  focus:border-2 border-black rounded-2xl "
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
              />
              <input
                type="text"
                name="kontak"
                placeholder="kontak"
                required
                className="mb-2 pr-40 pl-3 py-3  focus:border-2 border-black rounded-2xl "
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
              />
              {isPenerima && (
                <input
                  type="number"
                  name="penghasilan"
                  placeholder="penghasilan"
                  required={isPenerima}
                  className="mb-2 pr-40 pl-3 py-3 focus:border-2 border-black rounded-2xl "
                  style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                ></input>
              )}
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="pr-10 pl-3 py-3 focus:border-2 border-black rounded-2xl "
                  style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                ></input>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="pr-10 pl-3 py-3 focus:border-2 border-black rounded-2xl "
                  style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                ></input>
              </div>
              <button
                type="submit"
                className="mt-7 bg-indigo-700 py-4 rounded-xl text-xl text-white font-bold hover:scale-97 hover:bg-indigo-900 transition-all duration-300 ease-in-out"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
        {isRegisterFailed && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 ${
              isPenerima ? "translate-x-0" : "-translate-x-[45vw]"
            }`}
            onClick={() => setRegisterFailed(false)}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-black font-bold text-2xl mb-4">
                Registrasi Gagal!
              </h2>
              <p className="mb-6">
                Username telah digunakan, silakan coba username lain.
              </p>
              <button
                onClick={() => setRegisterFailed(false)}
                className="bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className={` ${
          isPenerima
            ? "bg-linear-to-r from-indigo-300 to-indigo-500"
            : "bg-linear-to-r from-indigo-500 to-indigo-300"
        } w-[45vw] h-full flex flex-col items-center ${
          isPenerima ? "translate-x-0 " : "-translate-x-[100vw]"
        } transition-all duration-700 ease-in-out`}
      >
        <div
          className="bg-white px-2 py-2 rounded-3xl mt-15"
          style={{ boxShadow: "2px 4px 4px rgba(0,0,0,0.18)" }}
        >
          <img src={logo} alt="Gambar Logo" className="w-[80px] lg:w-[160px]" />
        </div>
        <div className="mt-25 text-3xl w-[30vw] text-center font-extrabold text-white">
          Anda ingin {isPenerima ? "menyediakan" : "menerima"} Bantuan?
        </div>
        <div
          className="mt-6 w-[80px] h-[8px] bg-white rounded-xl"
          style={{ boxShadow: "inset 2px 3px 4px rgba(0,0,0,0.1)" }}
        ></div>
        <div className="mt-8 text-center w-[30vw] text-gray-100">
          {" "}
          {isPenerima
            ? "Daftar khusus bagi lembaga atau organisasi yang ingin menyalurkan bantuan sosial."
            : "Jika kamu terdampak secara ekonomi dan membutuhkan bantuan, kamu bisa mendaftar sebagai Penerima Bansos. Kami hadir untuk mendukungmu."}
        </div>
        <button
          type="button"
          onClick={() => setIsPenerima(!isPenerima)}
          className="mt-12 bg-white text-indigo-400 text-xl font-semibold px-10 py-3 rounded-2xl hover:bg-gray-100 hover:scale-97 transition-all duration-300 ease-in-out"
        >
          Daftar Sebagai {isPenerima ? "Penyedia" : "Penerima"}
        </button>
      </div>
    </div>
  );
}
