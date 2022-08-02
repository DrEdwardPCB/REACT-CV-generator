import { Style } from "@react-pdf/types";
import Github from "./github";
import Linkedin from "./linkedin";
import Mail from "./mail";
import Phone from "./phone";
export default function getIcons(
    name: string,
    style?: Style | Style[],
    color?: string
): JSX.Element {
    if (name === "phone") {
        return <Phone style={style} color={color} />;
    } else if (name === "email") {
        return <Mail style={style} color={color} />;
    } else if (name === "github") {
        return <Github style={style} color={color} />;
    } else if (name === "linkedin") {
        return <Linkedin style={style} color={color} />;
    } else {
        return <></>;
    }
}
