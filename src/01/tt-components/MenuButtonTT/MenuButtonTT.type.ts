import { SizeType } from "antd/lib/config-provider/SizeContext";
import { MenuButtonInterface } from ".";

export type MenuButtonTTProps = {
    menuButtonArr: MenuButtonInterface[] | null;
    size?: SizeType;
    loading?: boolean;
    disabled?: boolean;
}