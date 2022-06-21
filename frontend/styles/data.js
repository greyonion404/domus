
const screenSize = {
    mobileSmall: '320px',
    mobileMedium: '375px',
    mobileLarge: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopLarge: '1440px',
    desktop: '2560px',
};

const devices = {
    mobileS: `(max-width: ${screenSize.mobileSmall})`,
    mobileM: `(max-width: ${screenSize.mobileMedium})`,
    mobileL: `(max-width: ${screenSize.mobileLarge})`,
    tablet: `(max-width: ${screenSize.tablet})`,
    laptop: `(max-width: ${screenSize.laptop})`,
    laptopL: `(max-width: ${screenSize.laptopLarge})`,
    desktop: `(max-width: ${screenSize.desktop})`,
};



const color = {
    dark: "#000000",
    light: "#FFFFFF",
    primary: "#282B30",
    primaryMedium: "#36393E",
    secondary: "#798ED7",
    secondaryMedium: "#404EED",
    text: {
        light: "#99AAB5",
        lighter: "#C0C0C0",
        lightest: "#FFFFFF",
        inverted: "#000000"
    }
};


const data = {
    styles: {
        devices: devices,
        color: color,
    }
};

export { data as default }