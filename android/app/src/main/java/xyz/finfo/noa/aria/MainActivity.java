package xyz.finfo.noa.aria;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /*
    * React Native Splash Screen
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);  // here
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "finfo";
    }
}
