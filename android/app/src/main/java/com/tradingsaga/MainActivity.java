package com.tradingsaga;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.ironsource.mediationsdk.IronSource;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
  */
  protected String getMainComponentName() {
    return "Trading Saga";
  }

  @Override
  public void onResume() {
      super.onResume();
      IronSource.onResume(this);
  }

  @Override
  public void onPause() {
      super.onPause();
      IronSource.onPause(this);
  }
}
