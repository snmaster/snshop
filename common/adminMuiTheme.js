/**
 * Created by ChitSwe on 1/5/17.
 */
import {
    green800, green500,
    green900,
    teal700, teal400, teal900, 
    grey300,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
const muiTheme = {
    palette: {
        primary1Color: green800,
        primary2Color: green500,
        primary3Color: green900,
        accent1Color: teal700,
        accent2Color: teal400,
        accent3Color: teal900,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: green800,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
};
export default muiTheme;