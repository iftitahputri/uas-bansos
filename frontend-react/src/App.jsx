import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "./s.png";
import bg_main from "./give.jpg";
import us from "./office.jpeg";
import regis from "./regis.jpg";
import delivery from "./delivery.jpeg";
import invoice from "./invoice.jpg";
import user_regis from "./user_regis.jpg";
import { House, Users, Wrench, ChevronRight, ChevronLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const navigate = useNavigate();
  const [isPenerima, setIsPenerima] = useState(false);

  function handleClick(penerima) {
    setIsPenerima(penerima);
    localStorage.setItem("isPenerima", penerima);
    navigate("/login");
  }

  const [menuOpen, setMenuOpen] = useState(false);
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const [index, setIndex] = useState(0);

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const next = () => {
    if (index < 3) setIndex(index + 1);
  };

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    function onScroll() {
      let current = "";

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (window.pageYOffset >= top - height / 2) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <body className="bg-linear-to-t from-indigo-100 via-indigo-200 via-indigo-300 to-indigo-400 hide-scrollbar">
        <nav>
          <div className="fixed top-0 left-0 z-30 shadow-lg bg-white flex justify-between items-center px-3 py-2 rounded-b-4xl w-full ">
            <div>
              <img
                src={logo}
                alt="Gambar Logo"
                className="w-[100px] lg:w-[200px]"
              />
            </div>
            <div className="relative flex justify-center items-center pr-20">
              <div className="absolute">
                <ul className="hidden lg:flex whitespace-nowrap items-center gap-[4vw] text-md pl-20 font-semibold flex-col lg:flex-row">
                  <li className=" flex items-center gap-1 cursor-pointer">
                    <House
                      size={16}
                      className={`${
                        activeSection === "beranda"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    />
                    <a
                      href="#beranda"
                      className={`${
                        activeSection === "beranda"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    >
                      Beranda
                    </a>
                  </li>
                  <li className="flex items-center gap-1 cursor-pointer">
                    <Users
                      size={16}
                      className={`${
                        activeSection === "tentang_kami"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    />
                    <a
                      href="#tentang_kami"
                      className={`${
                        activeSection === "tentang_kami"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li className="flex items-center gap-1 cursor-pointer">
                    <Wrench
                      size={16}
                      className={`${
                        activeSection === "cara_kerja"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    />
                    <a
                      href="#cara_kerja"
                      className={`${
                        activeSection === "cara_kerja"
                          ? "text-indigo-700 font-bold"
                          : "text-black"
                      }`}
                    >
                      Cara Kerja
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center font-bold gap-[2vw] pr-5">
              <div className="text-md lg:text-md lg:px-2 lg:py-1 cursor-pointer bg-indigo-700 px-2 py-1 rounded-full text-white hover:bg-indigo-900  hover:border-indigo-900 transition-all duration-300 ease-in-out">
                <Link to="/login">Masuk</Link>
              </div>
              <div className="hidden lg:flex lg:text-md text-md cursor-pointer border-4 border-indigo-900 rounded-full px-2 py-1 hover:bg-indigo-900 hover:text-white transition-all duration-300 ease-in-out">
                <Link to="/register">Daftar</Link>
              </div>
              <button
                className="lg:hidden text-xl text-black hover:scale-125 transition-transfrom duration-300 ease-in-out"
                id="tombol"
                onClick={toggleMenu}
              >
                ☰
              </button>
            </div>
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleMenu}
                  className="text-xl text-black my-4 hover:font-bold hover:text-2xl"
                >
                  ✕
                </button>
                <div className="text-xl cursor-pointer font-bold border-4 border-indigo-900 rounded-xl px-2 py-1 hover:text-white hover:bg-indigo-900 transition-all duration-300 ease-in-out">
                  Daftar
                </div>
              </div>
              <ul className="py-10 font-semibold">
                <li className="flex items-center gap-2 pb-3 border-b-2 border-gray-400 cursor-pointer hover:text-indigo-700">
                  <House
                    size={16}
                    className={`${
                      activeSection === "beranda"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  />
                  <a
                    href="#beranda"
                    className={`${
                      activeSection === "beranda"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  >
                    Beranda
                  </a>
                </li>
                <li className="flex items-center gap-2 pb-3 mt-3 border-b-2 border-gray-400 cursor-pointer hover:text-indigo-700">
                  <Users
                    size={16}
                    className={`${
                      activeSection === "tentang_kami"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  />
                  <a
                    href="#tentang_kami"
                    className={`${
                      activeSection === "tentang_kami"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  >
                    Tentang Kami
                  </a>
                </li>
                <li className="flex items-center gap-2 mt-3 cursor-pointer hover:text-indigo-700">
                  <Wrench
                    size={16}
                    className={`${
                      activeSection === "cara_kerja"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  />
                  <a
                    href="#cara_kerja"
                    className={`${
                      activeSection === "cara_kerja"
                        ? "text-indigo-700 font-bold"
                        : "text-black"
                    }`}
                  >
                    Cara Kerja
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMenu}
            ></div>
          )}
        </nav>

        <section
          id="beranda"
          className=" h-[100vh] flex flex-col lg:flex-row lg:p-0 mt-[50px] items-center justify-center "
        >
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg_main})`,
            }}
            className="bg-cover shadow-xl/30 shadow-green-700   bg-center bg-linear-to-b from-[rgba(0, 0, 0, 0.6] to-[rgba(0, 0, 0, 0.6] flex-1 text-center lg:text-left m-5 rounded-3xl"
          >
            <h1
              data-aos="fade-up"
              className="text-4xl font-extrabold text-white mx-10 mt-10 mb-5 lg:max-w-[40vw] leading-tight "
            >
              <span className="text-indigo-700 bg-white rounded-xl px-1 lg:leading-none leading-loose">
                Transparansi
              </span>{" "}
              dan{" "}
              <span className="text-indigo-700 bg-white rounded-xl px-1">
                Efisiensi
              </span>{" "}
              dalam Penyaluran Bantuan Sosial
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mx-10 mb-20 lg:mb-10 lg:max-w-[40vw] text-white opacity-75"
            >
              BansosHub menghubungkan tangan yang memberi dan hati yang
              membutuhkan. satu platform untuk penyaluran bantuan yang mudah,
              terpercaya, dan tepat sasaran
            </p>
            <div className="space-y-4">
              <button
                data-aos="zoom-in"
                data-aos-delay="500"
                onClick={() => handleClick(false)}
                className="lg:mb-20 ml-10 mr-5 bg-indigo-700 text-white font-semibold text-xl px-2 py-1 rounded-xl hover:scale-95 hover:bg-indigo-900 transition-all duration-300 ease-in-out"
              >
                Bantu Sekarang
              </button>
              <button
                data-aos="zoom-in"
                data-aos-delay="500"
                onClick={() => handleClick(true)}
                className="bg-green-500 text-white font-semibold  text-xl px-2 py-1 rounded-xl hover:scale-95 hover:bg-green-700 transition-all duration-300  ease-in-out"
              >
                Dapatkan Bantuanmu
              </button>
            </div>
          </div>
        </section>

        <section
          id="tentang_kami"
          className=" flex flex-col justify-center px-6 py-30"
        >
          <div className="flex flex-col lg:flex-row items-center lg:text-left lg:items-stretch h-full">
            <div
              data-aos="fade-right"
              className="relative bg-cover shadow-xl/30 shadow-green-700  bg-center bg-linear-to-b from-[rgba(0, 0, 0, 0.6] to-[rgba(0, 0, 0, 0.6] flex-1 text-center lg:text-left m-5 max-w-[80vw] lg:max-w-[50vw] rounded-3xl overflow-hidden"
            >
              <img
                src={us}
                alt="Tentang Kami"
                className="w-full h-full static lg:absolute object-cover"
                style={{ objectFit: "cover", height: "100%" }}
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="w-full lg:max-w-[50vw] flex-1 p-6 flex flex-col justify-center">
              <h1 className="flex justify-center lg:justify-start text-2xl lg:text-4xl font-bold mb-4 flex">
                <div
                  data-aos="fade-down"
                  className="bg-indigo-700 rounded-xl text-white px-3 py-2"
                >
                  Tentang Kami
                </div>
              </h1>
              <p data-aos="fade-down" data-aos-delay="200">
                <strong>BansosHub</strong> adalah platform digital yang membantu
                proses pendataan dan penyaluran bantuan sosial secara lebih
                cepat, transparan, dan tepat sasaran. Kami hadir untuk
                mempermudah kolaborasi antara penyedia bantuan, pemerintah, dan
                masyarakat dengan sistem yang rapi, aman, dan mudah dipantau.
                Tujuan kami adalah menciptakan ekosistem distribusi bantuan yang
                adil dan dapat dipertanggung jawabkan.
              </p>
            </div>
          </div>

          <div className="md:mt-20 mt-15 text-center flex md:flex-row flex-col gap-10 md:gap-0 justify-around">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex-1 pb-10 mx-5 shadow-xl rounded-2xl hover:scale-105 transition-scale duration-300 ease-in-out"
            >
              <h1 className="text-4xl text-indigo-700 font-extrabold">76+</h1>
              <p className="text-xl font-bold">
                Paket dibagikan setiap bulannya
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex-1 pb-10 mx-5 shadow-xl rounded-2xl hover:scale-105 transition-scale duration-300 ease-in-out"
            >
              <h1 className="text-4xl text-indigo-700 font-bold">214+</h1>
              <p className="text-xl font-bold">Orang mendapatkan bantuan</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex-1 pb-10 mx-5 shadow-xl rounded-2xl hover:scale-105 transition-scale duration-300 ease-in-out"
            >
              <h1 className="text-4xl text-indigo-700 font-bold">546+</h1>
              <p className="text-xl font-bold">Paket telah dibagikan</p>
            </div>
          </div>
        </section>
        <section className=" py-30 px-4 md:px-16" id="cara_kerja">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 flex justify-center">
              <div
                data-aos="zoom-out"
                className="bg-indigo-700 text-center rounded-xl text-white px-3 py-2"
              >
                Cara Kerja BansosHub
              </div>
            </h1>
            <p
              data-aos="zoom-out"
              data-aos-delay="200"
              className="text-center text-md lg:text-lg mb-14"
            >
              Kami bantu mempermudah distribusi bantuan agar tepat sasaran dan
              tanpa ribet.
            </p>
          </div>
          <div
            className="flex flex-row lg:gap-15 transition-transform duration-500"
            style={{
              transform:
                window.innerWidth < 768
                  ? `translateX(calc(-${index} * (92vw + 3.75rem)))`
                  : "none",
            }}
          >
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className=" lg:ml-0 lg:mr-0 mr-15 flex-1 bg-white rounded-xl shadow-xl hover:scale-95 hover:shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0 md:flex-shrink-1 min-w-[92vw] md:min-w-auto"
            >
              <img
                src={regis}
                alt="regis"
                className="object-cover min-h-[35vh] w-full rounded-t-xl"
              />
              <h3 className="text-xl font-bold my-3 mx-3">
                Penyedia Mendaftar
              </h3>
              <p className="mx-3 mb-3 text-sm">
                Lembaga atau instansi mendaftar dan menginput data bantuan.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="mr-15 lg:mr-0 flex-1 bg-white rounded-xl shadow-xl hover:scale-95 hover:shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0 md:flex-shrink-1 min-w-[92vw] md:min-w-auto"
            >
              <img
                src={user_regis}
                alt="user_regis"
                className="object-cover max-h-[35vh] w-full rounded-t-xl"
              />
              <h3 className="text-xl font-bold my-3 mx-3">
                Penerima terdaftar
              </h3>
              <p className="mx-3 mb-3 text-sm">
                Data penerima divalidasi oleh sistem berdasarkan kriteria.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="mr-15 lg:mr-0 flex-1 bg-white rounded-xl shadow-xl hover:scale-95 hover:shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0 md:flex-shrink-1 min-w-[92vw] md:min-w-auto"
            >
              <img
                src={delivery}
                alt="Delivery"
                className="object-cover min-h-[35vh] w-full rounded-t-xl"
              />
              <h3 className="text-xl font-bold my-3 mx-3">Bantuan Dikirim</h3>
              <p className="mx-3 mb-3 text-sm">
                Barang dikirim langsung ke penerima atau lewat posko.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="1200"
              className="mr-15 lg:mr-0 flex-1 bg-white rounded-xl shadow-xl hover:scale-95 hover:shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0 md:flex-shrink-1 min-w-[92vw] md:min-w-auto"
            >
              <img
                src={invoice}
                alt="Invoice"
                className="object-cover max-h-[35vh] w-full rounded-t-xl"
              />
              <h3 className="text-xl font-bold my-3 mx-3">Invoice Tercatat</h3>
              <p className="mx-3 mb-3 text-sm">
                Setiap pengiriman otomatis tercatat sebagai invoice digital.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-5 lg:hidden">
            <button
              onClick={prev}
              disabled={index === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              disabled={index === 3}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </section>

        <footer className="pt-20 bg-slate-700 h-[35vh] flex flex-col justify-center items-center py-10">
          <div>
            <div className="flex gap-4">
              <FontAwesomeIcon
                icon={faFacebook}
                className="bg-white p-1 rounded-full hover:scale-110 transition-scale duration-300 ease-in-out"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="bg-white p-1 rounded-full hover:scale-110 transition-scale duration-300 ease-in-out"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="bg-white p-1 rounded-full hover:scale-110 transition-scale duration-300 ease-in-out"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="bg-white p-1 rounded-full hover:scale-110 transition-scale duration-300 ease-in-out"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="bg-white p-1 rounded-full hover:scale-110 transition-scale duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="mt-5 pb-15 text-white flex justify-between gap-10 text-sm font-light">
            <div className="hover:text-gray-400">
              <a href="#beranda">Beranda</a>
            </div>
            <div className="hover:text-gray-400">
              <a href="#tentang_kami">Tentang Kami</a>
            </div>
            <div className="hover:text-gray-400">
              <a href="#cara_kerja">Cara Kerja</a>
            </div>
          </div>
          <div className="text-white text-sm">
            Copyright ©2025 BansosHub. All rights Reserved.
          </div>
        </footer>
      </body>
    </>
  );
}
