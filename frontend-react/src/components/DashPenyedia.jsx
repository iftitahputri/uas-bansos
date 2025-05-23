import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../s.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LogOut,
  Layers,
  Handshake,
  CircleX,
  Pencil,
  Trash2,
  CircleCheck,
  Search,
} from "lucide-react";
import profile from "../propil.jpeg";

export default function DashPenyedia() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const [isRiwayat, setIsRiwayat] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isTambah, setIsTambah] = useState(false);
  const [dataStok, setDataStok] = useState([]);
  const [dataRiwayat, setDataRiwayat] = useState([]);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [overlayType, setOverlayType] = useState("");

  useEffect(() => {
    const dummyDataDatabase = [
      {
        id_paket: 101,
        nama_paket: "Beras 5kg",
        stok: 20,
        terakhir_diperbaharui: "2 hari lalu",
      },
      {
        id_paket: 102,
        nama_paket: "Minyak Goreng 2L",
        stok: 15,
        terakhir_diperbaharui: "kemarin",
      },
      {
        id_paket: 103,
        nama_paket: "Telur 1kg",
        stok: 30,
        terakhir_diperbaharui: "hari ini",
      },
      {
        id_paket: 104,
        nama_paket: "Gula 1kg",
        stok: 10,
        terakhir_diperbaharui: "3 hari lalu",
      },
      {
        id_paket: 105,
        nama_paket: "Mie Instan 10 bungkus",
        stok: 25,
        terakhir_diperbaharui: "seminggu lalu",
      },
    ];
    setDataStok(dummyDataDatabase);
  }, []);

  useEffect(() => {
    const dummyDataRiwayat = [
      {
        id_transaksi: 101,
        id_penerima: 201,
        id_paket: 301,
        tanggal_penyaluran: "2025-05-20",
        pengambilan_selanjutnya: "2025-06-20",
      },
      {
        id_transaksi: 102,
        id_penerima: 202,
        id_paket: 302,
        tanggal_penyaluran: "2025-05-19",
        pengambilan_selanjutnya: "2025-06-19",
      },
      {
        id_transaksi: 103,
        id_penerima: 203,
        id_paket: 303,
        tanggal_penyaluran: "2025-05-18",
        pengambilan_selanjutnya: "2025-06-18",
      },
      {
        id_transaksi: 104,
        id_penerima: 204,
        id_paket: 304,
        tanggal_penyaluran: "2025-05-17",
        pengambilan_selanjutnya: "2025-06-17",
      },
      {
        id_transaksi: 105,
        id_penerima: 205,
        id_paket: 305,
        tanggal_penyaluran: "2025-05-16",
        pengambilan_selanjutnya: "2025-06-16",
      },
      {
        id_transaksi: 106,
        id_penerima: 206,
        id_paket: 306,
        tanggal_penyaluran: "kemarin",
        pengambilan_selanjutnya: "besok",
      },
      {
        id_transaksi: 107,
        id_penerima: 207,
        id_paket: 307,
        tanggal_penyaluran: "hari ini",
        pengambilan_selanjutnya: "minggu depan",
      },
    ];
    setDataRiwayat(dummyDataRiwayat);
  }, []);

  const showOverlay = (message, type) => {
    setOverlayMessage(message);
    setOverlayType(type);
    setTimeout(() => {
      setOverlayMessage("");
      setOverlayType("");
    }, 2000);
  };

  const handleHapus = (id) => {
    if (!isRiwayat) {
      const gagal = true;

      if (gagal) {
        showOverlay("Gagal menghapus paket, coba lagi nanti", "error");
      } else {
        const updated = dataStok.filter((item) => item.id_paket !== id);
        setDataStok(updated);
        showOverlay("Paket berhasil dihapus", "success");
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
                <div className="font-semibold">Username Penyedia</div>
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
        <div className="h-[10vh] flex mt-10 gap-10">
          <div className="bg-linear-to-t from-white via-white to-indigo-100 flex-1 py-10 rounded-xl shadow flex justify-center items-center gap-4 hover:scale-95 hover:shadow-xl transition-all duration-300 ease-in-out">
            <Layers
              size={32}
              className="w-[40px] h-[40px] p-2 bg-green-500 rounded-full "
            />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold">10</h1>
              <h3 className="text-sm text-gray-700">Jumlah Stok Bansos</h3>
            </div>
          </div>
          <div className="bg-linear-to-t from-white via-white to-indigo-100 flex-1 py-10 rounded-xl shadow flex justify-center items-center gap-4 hover:scale-95 hover:shadow-xl transition-all duration-300 ease-in-out">
            <Handshake
              size={32}
              className="w-[40px] h-[40px] p-2 bg-indigo-500 rounded-full "
            />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold">10</h1>
              <h3 className="text-sm text-gray-700">
                Paket Bansos Telah Terdistribusi
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-10 mb-10 h-[10vh] bg-indigo-700 text-white mx-10 rounded-xl shadow">
        <div className="flex justify-around items-center p-4 text-sm font-semibold">
          <div
            className={
              isRiwayat ? "" : "border-b-4 border-indigo-100 pb-2 rounded-md"
            }
          >
            <button type="button" onClick={() => setIsRiwayat(false)}>
              Database Bansos
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
        {isRiwayat == false && (
          <div className={`mt-5 h-[10vh] bg-white rounded-t-xl shadow p-5`}>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="py-2 px-3 bg-indigo-700 text-xs text-white font-semibold rounded-xl mb-5 hover:scale-95 hover:bg-indigo-900 transition-all duration-300 ease-in-out"
                onClick={() => setIsTambah(!isTambah)}
              >
                + Tambah Paket Baru
              </button>
              <div className="flex items-center gap-1 ">
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
          </div>
        )}

        {isTambah && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"
            onClick={() => setIsTambah(false)}
          >
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <div className="bg-linear-to-t from-white via-white to-indigo-100 w-[50vw] h-[65vh] rounded-2xl p-5 text-black">
                <h1 className="text-xl font-bold text-black">Tambah Paket</h1>
                <div className="flex mt-1 bg-indigo-700 w-[46.8vw] h-[5px] rounded-2xl"></div>
                <form className="flex flex-col flex-wrap">
                  <input
                    type="text"
                    name="nama_paket"
                    placeholder="Nama Paket"
                    required
                    className="mt-8 pr-5 pl-3 py-2 rounded-xl"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                  ></input>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      name="stok"
                      placeholder="Stok"
                      required
                      className="flex-1 mt-2 pr-5 pl-3 py-2 rounded-xl"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                    ></input>
                    <input
                      type="number"
                      name="max_penghasilan"
                      placeholder="Maksimum Penghasilan"
                      required
                      className="flex-1 mt-2 pr-5 pl-3 py-2 rounded-xl"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                    ></input>
                  </div>
                  <textarea
                    type="text"
                    name="deskripsi"
                    placeholder="Deskripsi"
                    required
                    className="mt-2 pr-5 pl-3 pt-2 pb-20 text-wrap rounded-xl resize-none"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                  ></textarea>
                  <button
                    type="submit"
                    className=" bg-indigo-700 mx-60 my-6 py-2 rounded-2xl text-white font-bold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {isRiwayat && (
          <div
            className={`flex justify-end mt-5 h-[8vh] bg-white shadow rounded-t-xl p-5`}
          >
            <div className="flex items-center gap-1 mt-2">
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
        )}

        {isRiwayat == false && (
          <div className="h-[35vh] bg-white shadow px-10 py-2 overflow-x-auto ">
            <div className="">
              <table className="w-full text-xs text-gray-500 border-collapse border-2 border-gray-300">
                <thead className="rounded-t-xl">
                  <tr className="bg-gray-300 text-left mx-5 border-b-2 border-gray-500">
                    <th className="w-1/5 py-3 px-3">ID Paket</th>
                    <th className="w-1/5 py-3 px-3">Nama Paket</th>
                    <th className="w-1/5 py-3 px-3">Stok</th>
                    <th className="w-1/5 py-3 px-3">Terakhir Diperbaharui</th>
                    <th className="w-1/5 py-3 px-3">Aksi</th>
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
                      <td className="py-3 px-3">{item.stok}</td>
                      <td className="py-3 px-3">
                        {item.terakhir_diperbaharui}
                      </td>
                      <td className="py-3 px-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEdit(!isEdit)}
                        >
                          <Pencil
                            size={16}
                            className="w-[30px] h-[30px] bg-yellow-300 text-black p-1 rounded-md hover:scale-95 transition-scale duration-300 hover:bg-yellow-500 ease-in-out"
                          />
                        </button>
                        <button>
                          <Trash2
                            size={16}
                            className="w-[30px] h-[30px] bg-red-500 text-black p-1 rounded-md hover:scale-95 transition-scale duration-300 hover:bg-red-700 ease-in-out"
                            onClick={() => handleHapus(item.id_paket)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isEdit && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"
            onClick={() => setIsEdit(false)}
          >
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <div className="bg-linear-to-t from-white via-white to-indigo-100 w-[25vw] h-[65vh] rounded-2xl p-5 text-black">
                <h1 className="text-xl font-bold text-black">Edit Paket</h1>
                <div className="flex mt-1 bg-indigo-700 w-[22vw] h-[5px] rounded-2xl"></div>
                <form className="flex flex-col flex-wrap">
                  <input
                    type="text"
                    name="nama_paket"
                    placeholder="Nama Paket"
                    required
                    className="mt-8 pr-5 pl-3 py-2 rounded-xl"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                  ></input>
                  <input
                    type="number"
                    name="stok"
                    placeholder="Stok"
                    required
                    className="mt-2 pr-5 pl-3 py-2 rounded-xl"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                  ></input>
                  <textarea
                    type="text"
                    name="deskripsi"
                    placeholder="Deskripsi"
                    required
                    className="mt-2 pr-5 pl-3 pt-2 pb-20 text-wrap rounded-xl resize-none"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.18)" }}
                  ></textarea>
                  <button
                    type="submit"
                    className=" bg-indigo-700 mx-20 my-6 py-2 rounded-2xl text-white font-bold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {overlayMessage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"
            onClick={() => setOverlayMessage(false)}
          >
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <div
                className={`bg-white w-[25vw] ${
                  overlayType === "success" ? "h-[150vh]" : "h-[50vh]"
                } rounded-2xl p-5 text-black`}
              >
                <div
                  className={`mb-3 ${
                    overlayType === "success"
                      ? "text-xl font-bold"
                      : "text-xl font-bold"
                  }`}
                >
                  {overlayMessage}
                </div>
                <div className={`flex justify-center items-center mt-1 mb-7 `}>
                  <div
                    className={`${
                      overlayType === "success" ? "bg-green-500" : "bg-red-500"
                    } rounded-2xl  w-[5vw] h-[5px] `}
                  ></div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  className="text-black flex justify-center items-center"
                >
                  {overlayType === "success" ? (
                    <CircleCheck
                      size={165}
                      className="text-white bg-green-500 rounded-full p-5"
                    />
                  ) : (
                    <CircleX
                      size={165}
                      className="text-white bg-red-500 rounded-full p-5"
                    />
                  )}
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
                    <th className="w-1/5 py-3 px-3">ID Transaksi</th>
                    <th className="w-1/5 py-3 px-3">ID Penerima</th>
                    <th className="w-1/5 py-3 px-3">ID Paket</th>
                    <th className="w-1/5 py-3 px-3">Tanggal Penyaluran</th>
                    <th className="w-1/5 py-3 px-3 text-nowrap">
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
                      <td className="py-3 px-3">{item.id_penerima}</td>
                      <td className="py-3 px-3">{item.id_paket}</td>
                      <td className="py-3 px-3">{item.tanggal_penyaluran}</td>
                      <td className="py-3 px-3">
                        {item.pengambilan_selanjutnya}
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
