import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../s.png";
import { LogOut, Box, Timer, Info, X, Search, Plus, Check } from "lucide-react";
import profile from "../propil.jpeg";
import axios from "axios";

export default function DashPenerima() {
  const [username, setUsername] = useState("");
  const [tipeBansos, setTipeBansos] = useState(0);
  const [sisaHari, setSisaHari] = useState(0);
  const [isRiwayat, setIsRiwayat] = useState(false);
  const [statusKlaim, setStatusKlaim] = useState(null);
  const [dataStok, setDataStok] = useState([]);
  const [dataRiwayat, setDataRiwayat] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get("http://localhost:5000/penerima/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    setUsername(res.data.data.username);
    setTipeBansos(res.data.data.tipeBansos);
    setSisaHari(res.data.data.sisaHari);
  })
  .catch(err => console.error("Gagal mengambil username:", err));
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get("http://localhost:5000/penerima/daftar", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => {
    setDataStok(res.data.data); 
  })
  .catch(err => console.error("Gagal mengambil username:", err));
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/penerima/riwayat", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setDataRiwayat(res.data.data);
    })
    .catch(err => console.error("Gagal mengambil username:", err));
  }, []);

  const handleKlaimBansos = async (id_paket) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:5000/penerima/request",
      { id_paket },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.status === "success") {
        setDataStok((prevData) =>
          prevData.map((item) =>
          item.id_paket === id_paket
            ? { ...item, stok: item.stok - 1 }
            : item
        )
      );
      setStatusKlaim("berhasil");
      setStatusMessage(res.data.message || "Klaim berhasil.");
    } else {
      setStatusKlaim("gagal");
      setStatusMessage(res.data.message || "Klaim gagal.");
    }
  } catch (error) {
    console.error("Klaim gagal:", error);
    setStatusKlaim("gagal");
    if (error.response && error.response.data && error.response.data.message) {
      setStatusMessage(error.response.data.message);
    } else {
      setStatusMessage("Terjadi kesalahan saat klaim.");
    }    
  }
};
      
  const [searchTermStok, setSearchTermStok] = useState("");
  const [searchTermRiwayat, setSearchTermRiwayat] = useState("");

  const filteredData = isRiwayat
    ? dataRiwayat.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTermRiwayat.toLowerCase())
        )
      )
    : dataStok.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTermStok.toLowerCase())
        )
      );

  return (
    <div className="h-[100vh] bg-linear-to-t from-indigo-100 to-indigo-300">
      <nav>
        <div className="bg-white w-[100vw] h-auto flex justify-between items-center rounded-b-4xl shadow-xl">
          <div className="px-3 py-2">
            <img
              src={logo}
              alt="Gambar Logo"
              className="w-[100px] lg:w-[200px]"
            />
          </div>
          <div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div
                  className="bg-cover rounded-full h-[40px] w-[40px] "
                  style={{ backgroundImage: `url(${profile})` }}
                ></div>
                <div className="font-semibold">{username}</div>
              </div>

              <div className="mr-10">
                <Link to="/">
                  <LogOut className="text-black hover:scale-95" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-10 ">
        <div className="h-[20vh] flex mt-3 gap-10">
          <div className="flex flex-1 gap-6 ">
            <div className="bg-linear-to-t from-white via-white to-indigo-100 flex-1 py-10 rounded-xl shadow flex justify-center items-center gap-4 hover:scale-95 hover:shadow-xl transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4 p-5">
                <Box
                  size={32}
                  className="w-[50px] h-[50px] p-1 bg-green-500 rounded-full "
                />
                <div>
                  <h1 className="text-2xl font-bold">{tipeBansos} </h1>
                  <h3 className="text-sm text-gray-700 text-nowrap">
                    Tipe Bansos Tersedia
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 gap-2">
            <div className="bg-linear-to-t from-white via-white to-indigo-100 flex-1  rounded-xl shadow flex justify-center items-center gap-4 hover:scale-95 hover:shadow-xl transition-all duration-300 ease-in-out">
              <Timer
                size={32}
                className="w-[50px] h-[50px] p-1 bg-yellow-500 rounded-full "
              />
              <div>
                <div className="text-2xl font-bold">{sisaHari}</div>
                <div className="text-sm text-gray-700">
                  Perkiraan bantuan selanjutnya
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-3 mb-10 h-[10vh] bg-indigo-700 text-white mx-10 rounded-xl shadow">
        <div className="flex justify-around items-center p-4 text-sm font-semibold">
          <div
            className={
              isRiwayat ? "" : "border-b-4 border-indigo-100 pb-2 rounded-md"
            }
          >
            <button type="button" onClick={() => setIsRiwayat(false)}>
              Daftar Bansos
            </button>
          </div>
          <div
            className={
              isRiwayat ? "border-b-4 border-indigo-100 pb-2 rounded-md" : ""
            }
          >
            <button type="button" onClick={() => setIsRiwayat(true)}>
              Riwayat Bansos
            </button>
          </div>
        </div>

        <div className={`mt-4 h-[8vh] bg-white shadow rounded-t-xl p-5`}>
          <div className="flex justify-end items-center gap-1 ">
            <Search size={24} className="flex text-gray-500" />

            <input
              placeholder="Cari . . ."
              className="border-2 border-gray-500 mr-7 rounded-full text-black pl-3 focus:outline-none text-sm"
              value={isRiwayat ? searchTermRiwayat : searchTermStok}
              onChange={
                isRiwayat
                  ? (e) => setSearchTermRiwayat(e.target.value)
                  : (e) => setSearchTermStok(e.target.value)
              }
            ></input>
          </div>
        </div>

        {isRiwayat == false && (
          <div className=" h-[38.5vh] bg-white shadow px-10 py-2 overflow-x-auto ">
            <div className="">
              <table className="w-full text-xs text-gray-500 border-collapse border-2 border-gray-300">
                <thead className="rounded-t-xl">
                  <tr className="bg-gray-300 text-left mx-5 border-b-2 border-gray-500">
                    <th className="w-1/6 py-3 px-3">ID Paket</th>
                    <th className="w-1/6 py-3 px-3">Nama Paket</th>
                    <th className="w-1/6 py-3 px-3">Maksimum Penghasilan</th>
                    <th className="w-1/6 py-3 px-3">Stok</th>
                    <th className="w-1/6 py-3 px-3">Detail</th>
                    <th className="w-1/6 py-3 px-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={item.id_paket}
                      className={`text-left  border-b-2 border-gray-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <td className="py-3 px-3">{item.id_paket}</td>
                      <td className="py-3 px-3">{item.nama_paket}</td>
                      <td className="py-3 px-3">{item.max_penghasilan}</td>
                      <td className="py-3 px-3">{item.stok}</td>
                      <td className="py-3 px-3 flex gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-md text-indigo-700"
                          onClick={() =>{console.log(item); setSelectedItem(item);}}
                        >
                          <Info size={20} />
                          <h1 className="text-indigo-700">Detail</h1>
                        </button>
                      </td>
                      <td className="py-3 px-3 ">
                        <Plus
                          size={16}
                          className="w-[30px] h-[30px] bg-green-600 text-white p-1 rounded-md hover:scale-95 transition-scale duration-300 hover:bg-green-400 ease-in-out"
                          onClick={() => handleKlaimBansos(item.id_paket)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {statusKlaim && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
            onClick={() => setStatusKlaim(null)}
          >
            <div
              className="bg-white rounded-xl p-8 shadow-lg text-center w-[300px]"
              onClick={(e) => e.stopPropagation()}
            >
              {statusKlaim === "berhasil" ? (
                <>
                  <Check
                    size={45}
                    className="text-green-500 mx-auto mb-4 border-4 border-green-500 rounded-full p-1"
                  />
                  <h1 className="text-xl font-bold text-green-600">
                    Pengambilan Berhasil
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    {statusMessage}
                  </p>
                </>
              ) : (
                <>
                  <X
                    size={40}
                    className="text-red-500 mx-auto mb-4 border-4 border-red-500 rounded-full"
                  />
                  <h1 className="text-xl font-bold text-red-600">
                    Pengambilan Gagal
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    {statusMessage}
                  </p>
                </>
              )}
              <button
                onClick={() => setStatusKlaim(null)}
                className="mt-7 px-4 py-2 rounded-md text-white bg-indigo-700 hover:bg-indigo-500"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center text-black"
            onClick={() => setSelectedItem(null)}
          >
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <div className="bg-linear-to-t from-white via-white to-indigo-100 w-[25vw] h-[65vh] rounded-2xl p-5">
                <div className="flex justify-end">
                  <X
                    onClick={() => setSelectedItem(null)}
                    className="hover:scale-95"
                  />
                </div>
                <h1 className="text-xl font-bold ">Deskripsi Paket</h1>
                <div className="flex mt-1 mb-3 bg-indigo-700 w-[22vw] h-[5px] rounded-2xl"></div>
                <div className="text-left">
                  <div className="bg-blue-100 px-2 py-1">
                    <label className="font-semibold">ID Paket: </label>
                    {selectedItem.id_paket}
                  </div>
                  <div className="px-2 py-1">
                    <label className="font-semibold">Nama Paket: </label>
                    {selectedItem.nama_paket}
                  </div>
                  <div className="bg-blue-100 mt-3 px-2 py-1">
                    <label className="font-semibold">
                      Maksimum Penghasilan:{" "}
                    </label>
                    {selectedItem.max_penghasilan}
                  </div>
                  <div className="px-2 mt-3 py-1">
                    <label className="font-semibold">Stok: </label>
                    {selectedItem.stok}
                  </div>
                  <div className="bg-blue-100 mt-3 px-2 py-1">
                    <label className="font-semibold">Deskripsi: </label>
                    {selectedItem.deskripsi}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isRiwayat && (
          <div className=" h-[38.5vh] bg-white shadow px-10 py-2 overflow-x-auto ">
            <div className="">
              <table className="w-full text-xs text-gray-500 border-collapse border-2 border-gray-300">
                <thead className="rounded-t-xl">
                  <tr className="bg-gray-300 text-left mx-5 border-b-2 border-gray-500">
                    <th className="w-1/4 py-3 px-3">ID Transaksi</th>
                    <th className="w-1/4 py-3 px-3">ID Paket</th>
                    <th className="w-1/4 py-3 px-3">Nama Paket</th>
                    <th className="w-1/4 py-3 px-3">Tanggal Penyaluran</th>
                    <th className="w-1/4 py-3 px-3 text-nowrap">
                      Pengambilan Berikutnya
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={item.id_transaksi}
                      className={`text-left  border-b-2 border-gray-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      <td className="py-3 px-3">{item.id_transaksi}</td>
                      <td className="py-3 px-3">{item.id_paket}</td>
                      <td className="py-3 px-3">{item.nama_paket}</td>
                      <td className="py-3 px-3">{item.last_pengambilan}</td>
                      <td className="py-3 px-3">
                        {item.next_pengambilan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="h-[5vh] bg-white shadow rounded-b-xl"></div>
      </div>
    </div>
  );
}
