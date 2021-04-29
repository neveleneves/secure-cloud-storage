import React from "react";

import s from "./StorageDirStructure.module.css";

export default function StorageDirStructure() {
  return (
    <div className={s.dirStructure}>
      <table className={s.dirTable}>
        <tbody>
          <tr className={s.titleLine}>
            <td className={s.titleTypeFile}></td>
            <td className={s.titleName}>Имя</td>
            <td className={s.titleLastChange}>Последнее изменение</td>
            <td className={s.titleAction}>Действие</td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileType}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.20182 25.1668H20.8685C21.789 25.1668 22.5352 24.4206 22.5352 23.5002V6.8335L17.5352 1.8335H4.20182C3.28135 1.8335 2.53516 2.57969 2.53516 3.50016V23.5002C2.53516 24.4206 3.28135 25.1668 4.20182 25.1668Z"
                  fill="#D5D5D5"
                />
                <path
                  d="M7.53516 12.4925H6.53516V14.4925H7.53516V12.4925ZM17.5352 14.4925H18.5352V12.4925H17.5352V14.4925ZM7.53516 17.5002H6.53516V19.5002H7.53516V17.5002ZM17.5352 19.5002H18.5352V17.5002H17.5352V19.5002ZM7.53516 7.49579H6.53516V9.49579H7.53516V7.49579ZM17.5352 9.49579H18.5352V7.49579H17.5352V9.49579ZM22.5352 6.8335H23.5352V6.41928L23.2423 6.12639L22.5352 6.8335ZM17.5352 1.8335L18.2423 1.12639L17.9494 0.833496H17.5352V1.8335ZM7.53516 14.4925H17.5352V12.4925H7.53516V14.4925ZM7.53516 19.5002H17.5352V17.5002H7.53516V19.5002ZM7.53516 9.49579H17.5352V7.49579H7.53516V9.49579ZM20.8685 24.1668H4.20182V26.1668H20.8685V24.1668ZM3.53516 23.5002V3.50016H1.53516V23.5002H3.53516ZM21.5352 6.8335V23.5002H23.5352V6.8335H21.5352ZM4.20182 2.8335H17.5352V0.833496H4.20182V2.8335ZM16.828 2.5406L21.828 7.5406L23.2423 6.12639L18.2423 1.12639L16.828 2.5406ZM4.20182 24.1668C3.83363 24.1668 3.53516 23.8683 3.53516 23.5002H1.53516C1.53516 24.9729 2.72906 26.1668 4.20182 26.1668V24.1668ZM20.8685 26.1668C22.3412 26.1668 23.5352 24.9729 23.5352 23.5002H21.5352C21.5352 23.8683 21.2367 24.1668 20.8685 24.1668V26.1668ZM3.53516 3.50016C3.53516 3.13197 3.83363 2.8335 4.20182 2.8335V0.833496C2.72906 0.833496 1.53516 2.0274 1.53516 3.50016H3.53516Z"
                  fill="black"
                />
              </svg>
            </td>
            <td className={s.fileName}>
              <a className={s.fileNameLink} href="/">
                Work.txt
              </a>
            </td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
            <nav className={s.fileNav}>
                <a className={s.fileDownload} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2 19L7.08333 12.4998M12.0 19L17.9 12.4998M12.5 18V1.6665M22.5 11.6665V22.4998H2.5V11.6665"
                      stroke="#009255d5"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <a className={s.fileDelete} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5 1.83331H3.5C2.57953 1.83331 1.83333 2.57951 1.83333 3.49998V23.5C1.83333 24.4205 2.57953 25.1666 3.5 25.1666H23.5C24.4205 25.1666 25.1667 24.4205 25.1667 23.5V3.49998C25.1667 2.57951 24.4205 1.83331 23.5 1.83331Z"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                    <path
                      d="M8.5 8.5L18.5 18.5M8.5 18.5L18.5 8.5"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
              </nav>
            </td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileType}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.20182 25.1668H20.8685C21.789 25.1668 22.5352 24.4206 22.5352 23.5002V6.8335L17.5352 1.8335H4.20182C3.28135 1.8335 2.53516 2.57969 2.53516 3.50016V23.5002C2.53516 24.4206 3.28135 25.1668 4.20182 25.1668Z"
                  fill="#0F82EC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.5352 18.5002L19.2018 15.1592L14.2018 20.156L7.53516 11.8335L2.53516 18.5002"
                  fill="#0F82EC"
                />
                <path
                  d="M22.5352 6.8335H23.5352V6.41928L23.2423 6.12639L22.5352 6.8335ZM17.5352 1.8335L18.2423 1.12639L17.9494 0.833496H17.5352V1.8335ZM19.2018 15.1592L19.9097 14.4529L19.2029 13.7444L18.4949 14.4519L19.2018 15.1592ZM14.2018 20.156L13.4214 20.7811L14.1192 21.6523L14.9087 20.8633L14.2018 20.156ZM7.53516 11.8335L8.31563 11.2083L7.50914 10.2015L6.73516 11.2335L7.53516 11.8335ZM20.8685 24.1668H4.20182V26.1668H20.8685V24.1668ZM3.53516 23.5002V3.50016H1.53516V23.5002H3.53516ZM21.5352 6.8335V23.5002H23.5352V6.8335H21.5352ZM4.20182 2.8335H17.5352V0.833496H4.20182V2.8335ZM16.828 2.5406L21.828 7.5406L23.2423 6.12639L18.2423 1.12639L16.828 2.5406ZM4.20182 24.1668C3.83363 24.1668 3.53516 23.8683 3.53516 23.5002H1.53516C1.53516 24.9729 2.72906 26.1668 4.20182 26.1668V24.1668ZM20.8685 26.1668C22.3412 26.1668 23.5352 24.9729 23.5352 23.5002H21.5352C21.5352 23.8683 21.2367 24.1668 20.8685 24.1668V26.1668ZM3.53516 3.50016C3.53516 3.13197 3.83363 2.8335 4.20182 2.8335V0.833496C2.72906 0.833496 1.53516 2.0274 1.53516 3.50016H3.53516ZM16.7018 11.1668H18.3685V9.16683H16.7018V11.1668ZM23.2431 17.7939L19.9097 14.4529L18.4939 15.8655L21.8272 19.2065L23.2431 17.7939ZM18.4949 14.4519L13.4949 19.4486L14.9087 20.8633L19.9087 15.8665L18.4949 14.4519ZM14.9823 19.5308L8.31563 11.2083L6.75469 12.4587L13.4214 20.7811L14.9823 19.5308ZM6.73516 11.2335L1.73516 17.9002L3.33516 19.1002L8.33516 12.4335L6.73516 11.2335Z"
                  fill="black"
                />
                <path
                  d="M3 18.7619L7.22222 13L14.0833 21.381L19.3611 16.1429L22 18.7619V24H3V18.7619Z"
                  fill="#26962B"
                  fillOpacity="0.87"
                  stroke="black"
                />
                <path
                  d="M7.5 11L3 16.8235V2H17.5L22 6.76471V16.8235L21.5 17.3529L19.5 14.7059L14.5 20L14 19.4706L7.5 11Z"
                  fill="#B7EEFF"
                  stroke="black"
                />
                <path d="M16 9V8H15V9H16Z" stroke="black" />
              </svg>
            </td>
            <td className={s.fileName}>
              <a className={s.fileNameLink} href="/">
                Photo.jpg
              </a>
            </td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
              <nav className={s.fileNav}>
                <a className={s.fileDownload} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2 19L7.08333 12.4998M12.0 19L17.9 12.4998M12.5 18V1.6665M22.5 11.6665V22.4998H2.5V11.6665"
                      stroke="#009255d5"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <a className={s.fileDelete} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5 1.83331H3.5C2.57953 1.83331 1.83333 2.57951 1.83333 3.49998V23.5C1.83333 24.4205 2.57953 25.1666 3.5 25.1666H23.5C24.4205 25.1666 25.1667 24.4205 25.1667 23.5V3.49998C25.1667 2.57951 24.4205 1.83331 23.5 1.83331Z"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                    <path
                      d="M8.5 8.5L18.5 18.5M8.5 18.5L18.5 8.5"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
              </nav>
            </td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileType}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.55493 20.6483V4.90757C1.55493 4.03823 2.26559 3.3335 3.14223 3.3335H9.49144L12.666 6.48164H22.1899C23.0665 6.48164 23.7772 7.18638 23.7772 8.05572V20.6483C23.7772 21.5177 23.0665 22.2224 22.1899 22.2224H3.14223C2.26559 22.2224 1.55493 21.5177 1.55493 20.6483Z"
                  fill="#FFBC68"
                  fillOpacity="0.83"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </td>
            <td className={s.fileName}>
              <a className={s.fileNameLink} href="/">
                Friends
              </a>
            </td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
            <nav className={s.fileNav}>
                <a className={s.fileDownload} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2 19L7.08333 12.4998M12.0 19L17.9 12.4998M12.5 18V1.6665M22.5 11.6665V22.4998H2.5V11.6665"
                      stroke="#009255d5"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
                <a className={s.fileDelete} href="/">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5 1.83331H3.5C2.57953 1.83331 1.83333 2.57951 1.83333 3.49998V23.5C1.83333 24.4205 2.57953 25.1666 3.5 25.1666H23.5C24.4205 25.1666 25.1667 24.4205 25.1667 23.5V3.49998C25.1667 2.57951 24.4205 1.83331 23.5 1.83331Z"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                    <path
                      d="M8.5 8.5L18.5 18.5M8.5 18.5L18.5 8.5"
                      stroke="#830000b0"
                      strokeWidth="2"
                    />
                  </svg>
                </a>
              </nav>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
