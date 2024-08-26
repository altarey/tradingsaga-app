import React, {forwardRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView, {WebViewProps} from 'react-native-webview';
import {PWA_URL} from '../../../config/constants';
import BoardLoadingIndicator from './BoardLoadingIndicator';
import BoardWebViewError from './BoardWebViewError';
import {BOARD_Z_INDEXES} from '../boardConstants';

enum Status {
  LOADING,
  SUCCESS,
  FAIL,
}

interface StateLoading {
  status: Status.LOADING;
}

interface StateSuccess {
  status: Status.SUCCESS;
}

interface StateFail {
  status: Status.FAIL;
  errorMessage: string;
}

type State = StateLoading | StateSuccess | StateFail;

interface BoardWebViewProps {
  onRetry: () => void;
  onMessage: WebViewProps['onMessage']
}

const BoardWebView = forwardRef<WebView, BoardWebViewProps>((props, ref) => {
  const {onRetry, onMessage} = props;
  const [state, setState] = useState<State>({status: Status.LOADING});

  const onLoadStart = () => setState({status: Status.LOADING});

  // setTimeout - 250ms is needed to prevent flashing error fallback page on Android
  const handleOnLoadEnd = () => setTimeout(() => setState({status: Status.SUCCESS}), 250);

  const onError: WebViewProps['onError'] = ({nativeEvent}) => {
    setState({
      status: Status.FAIL,
      errorMessage: `
        Title: ${nativeEvent.title}
        =====
        Code: ${nativeEvent.code}
        =====
        Description: ${nativeEvent.description}
        =====
        Domain: ${nativeEvent.domain}`,
    });
  };

  const onHttpError: WebViewProps['onHttpError'] = ({nativeEvent}) =>
    setState({
      status: Status.FAIL,
      errorMessage: `
      Status Code: ${nativeEvent.statusCode}
      =====
      Description: ${nativeEvent.description}`,
    });

  const renderError: WebViewProps['renderError'] = (errorDomain, errorCode, errorDescription) => {
    // It fixes Typescript complaints and prevents continues rendering
    if (state.status === Status.FAIL) return <View />;

    setState({
      status: Status.FAIL,
      errorMessage: `
        Domain: ${errorDomain}
        =====
        Code: ${errorCode}
        =====
        Description: ${errorDescription}
      `,
    });

    // It fixes Typescript complaints
    return <View />;
  };

  return (
    <View style={styles.container}>
      {state.status === Status.LOADING && <BoardLoadingIndicator />}
      {state.status === Status.FAIL && <BoardWebViewError errorMessage={state.errorMessage} onRetry={onRetry} />}
      <WebView
        scrollEnabled={false}
        overScrollMode="never"
        bounces={false}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        directionalLockEnabled={false}
        keyboardDisplayRequiresUserAction={false}
        hideKeyboardAccessoryView={true}
        allowsBackForwardNavigationGestures={false}
        allowsLinkPreview={false}
        pullToRefreshEnabled={false}
        cacheEnabled
        domStorageEnabled
        javaScriptEnabled
        ref={ref}
        style={styles.webView}
        source={{uri: PWA_URL}}
        onMessage={onMessage}
        onLoadEnd={handleOnLoadEnd}
        onLoadStart={onLoadStart}
        onError={onError}
        onHttpError={onHttpError}
        renderError={renderError}
      />
    </View>
  );
});

export default BoardWebView;

const styles = StyleSheet.create({
  container: {
    zIndex: BOARD_Z_INDEXES.BOARD_WEB_VIEW,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webView: {
    zIndex: BOARD_Z_INDEXES.BOARD_WEB_VIEW,
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
