import { Box } from "../UI/Box";

export const LoadingSVG = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      animation: "loading-rotate 1s linear infinite",
      display: "block",
    }}
  >
    <style>
      {`
                                @keyframes loading-rotate {
                                        100% { transform: rotate(360deg); }
                                }
                        `}
    </style>
    <g clipPath="url(#clip0_216_5060)">
      <rect width="40" height="40" fill="white" fillOpacity="0.01" />
      <g clipPath="url(#clip1_216_5060)">
        <g clipPath="url(#clip2_216_5060)">
          <path
            d="M17.5 2.5C17.5 1.11929 18.6193 0 20 0C21.3807 0 22.5 1.11929 22.5 2.5V9.5C22.5 10.8807 21.3807 12 20 12C18.6193 12 17.5 10.8807 17.5 9.5V2.5Z"
            fill="#00071B"
            fillOpacity="0.498039"
          />
        </g>
        <g clipPath="url(#clip3_216_5060)">
          <path
            d="M30.6066 5.85762C31.5828 4.8813 33.1658 4.8813 34.142 5.85762C35.1184 6.83393 35.1184 8.41684 34.142 9.39315L29.1922 14.3429C28.216 15.3192 26.633 15.3192 25.6568 14.3429C24.6805 13.3666 24.6805 11.7837 25.6568 10.8074L30.6066 5.85762Z"
            fill="#00051D"
            fillOpacity="0.454902"
          />
        </g>
        <g clipPath="url(#clip4_216_5060)">
          <path
            d="M37.5 17.5C38.8807 17.5 40 18.6193 40 20C40 21.3807 38.8807 22.5 37.5 22.5L30.5 22.5C29.1193 22.5 28 21.3807 28 20C28 18.6193 29.1193 17.5 30.5 17.5L37.5 17.5Z"
            fill="#000830"
            fillOpacity="0.27451"
          />
        </g>
        <g clipPath="url(#clip5_216_5060)">
          <path
            d="M34.1422 30.6072C35.1184 31.5836 35.1184 33.1664 34.1422 34.1428C33.166 35.119 31.583 35.119 30.6068 34.1428L25.6568 29.193C24.6806 28.2168 24.6806 26.6338 25.6568 25.6576C26.6332 24.6812 28.216 24.6812 29.1924 25.6576L34.1422 30.6072Z"
            fill="#00062E"
            fillOpacity="0.196078"
          />
        </g>
        <g clipPath="url(#clip6_216_5060)">
          <path
            d="M22.5 37.5C22.5 38.8807 21.3807 40 20 40C18.6193 40 17.5 38.8807 17.5 37.5L17.5 30.5C17.5 29.1193 18.6193 28 20 28C21.3807 28 22.5 29.1193 22.5 30.5L22.5 37.5Z"
            fill="#00002F"
            fillOpacity="0.14902"
          />
        </g>
        <g clipPath="url(#clip7_216_5060)">
          <path
            d="M9.3935 34.1424C8.41718 35.1188 6.83428 35.1186 5.85796 34.1424C4.88165 33.166 4.88165 31.5832 5.85796 30.6068L10.8077 25.6572C11.784 24.6808 13.367 24.6808 14.3433 25.6572C15.3196 26.6334 15.3196 28.2164 14.3433 29.1927L9.3935 34.1424Z"
            fill="#000932"
            fillOpacity="0.121569"
          />
        </g>
        <g clipPath="url(#clip8_216_5060)">
          <path
            d="M2.5 22.5C1.11929 22.5 1.5566e-07 21.3807 3.47678e-07 20C5.39694e-07 18.6193 1.11929 17.5 2.5 17.5L9.5 17.5C10.8807 17.5 12 18.6193 12 20C12 21.3807 10.8807 22.5 9.5 22.5L2.5 22.5Z"
            fill="#00002D"
            fillOpacity="0.0901961"
          />
        </g>
        <g clipPath="url(#clip9_216_5060)">
          <path
            d="M5.85786 9.39276C4.88154 8.41646 4.88154 6.83354 5.85786 5.85724C6.83417 4.88092 8.41708 4.88092 9.39339 5.85724L14.3431 10.807C15.3194 11.7833 15.3194 13.3662 14.3431 14.3425C13.3668 15.3188 11.7839 15.3188 10.8076 14.3425L5.85786 9.39276Z"
            fill="#000714"
            fillOpacity="0.623529"
          />
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_216_5060">
        <rect width="40" height="40" fill="white" />
      </clipPath>
      <clipPath id="clip1_216_5060">
        <rect width="40" height="40" fill="white" />
      </clipPath>
      <clipPath id="clip2_216_5060">
        <rect width="5" height="40" fill="white" transform="translate(17.5)" />
      </clipPath>
      <clipPath id="clip3_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(32.3742 4.08984) rotate(45)"
        />
      </clipPath>
      <clipPath id="clip4_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(40 17.5) rotate(90)"
        />
      </clipPath>
      <clipPath id="clip5_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(35.91 32.375) rotate(135)"
        />
      </clipPath>
      <clipPath id="clip6_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(22.5 40) rotate(-180)"
        />
      </clipPath>
      <clipPath id="clip7_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(7.62574 35.9102) rotate(-135)"
        />
      </clipPath>
      <clipPath id="clip8_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(0 22.5) rotate(-90)"
        />
      </clipPath>
      <clipPath id="clip9_216_5060">
        <rect
          width="5"
          height="40"
          fill="white"
          transform="translate(4.09008 7.625) rotate(-45)"
        />
      </clipPath>
    </defs>
  </svg>
);
