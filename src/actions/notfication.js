import {MessageBarManager} from "react-native-message-bar";
import {getStatusBarHeight} from "react-native-status-bar-height";

export function notification(obj) {
    MessageBarManager.showAlert({
        ...obj,
        viewTopInset : getStatusBarHeight(true)
        // See Properties section for full customization
        // Or check `index.ios.js` or `index.android.js` for a complete example
    });
}
