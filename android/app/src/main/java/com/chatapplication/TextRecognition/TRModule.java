package com.chatapplication.TextRecognition;

import android.net.Uri;
import android.widget.Toast;

import androidx.annotation.NonNull;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.ml.common.modeldownload.FirebaseModelDownloadConditions;
import com.google.firebase.ml.vision.FirebaseVision;
import com.google.firebase.ml.naturallanguage.FirebaseNaturalLanguage;
import com.google.firebase.ml.naturallanguage.translate.FirebaseTranslateLanguage;
import com.google.firebase.ml.naturallanguage.translate.FirebaseTranslatorOptions;
import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.text.FirebaseVisionText;
import com.google.firebase.ml.vision.text.FirebaseVisionTextRecognizer;
import com.google.firebase.ml.naturallanguage.translate.FirebaseTranslator;

public class TRModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    ReadableMap options;
    protected Callback callback;
    String IMAGE_SOURCE = "imageSource";
    String LANGUAGE = "language";
    String resultText;

    public TRModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TextRecognition";
    }

    @ReactMethod
    public void getSourceImage(final ReadableMap options, final Callback callback) {
        try {
            // this.callback = callback;
            this.options = options;

            FirebaseVisionImage image = FirebaseVisionImage.fromFilePath(this.reactContext, Uri.parse(options.getString(IMAGE_SOURCE)));
            FirebaseVisionTextRecognizer detector = FirebaseVision.getInstance()
                    .getOnDeviceTextRecognizer();

            Task<FirebaseVisionText> result =
                    detector.processImage(image)
                            .addOnSuccessListener(new OnSuccessListener<FirebaseVisionText>() {
                                @Override
                                public void onSuccess(FirebaseVisionText firebaseVisionText) {
                                    // Task completed successfully
                                    // ..
                                    resultText = firebaseVisionText.getText();
                                    callback.invoke(resultText);
                                }
                            })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            // Task failed with an exception
                                            // ...
                                            Toast.makeText(getReactApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT);
                                            callback.invoke("");
                                        }
                                    });



        } catch (Exception ex) {
            Toast.makeText(getReactApplicationContext(), ex.getMessage(), Toast.LENGTH_SHORT);
            callback.invoke("");
        }

    }
    @ReactMethod
    public void translate(final ReadableMap options, final Callback callback) {
        try {

            this.options = options;

            int languageCode = (int)(options.getDouble(LANGUAGE));

            // Create an English to any other language translator:
            FirebaseTranslatorOptions option =
                    new FirebaseTranslatorOptions.Builder()
                            .setSourceLanguage(FirebaseTranslateLanguage.EN)
                            .setTargetLanguage(languageCode)
                            .build();

            final FirebaseTranslator englishTranslator =
                    FirebaseNaturalLanguage.getInstance().getTranslator(option);

            FirebaseModelDownloadConditions conditions = new FirebaseModelDownloadConditions.Builder()
                    .build();
            englishTranslator.downloadModelIfNeeded(conditions)
                    .addOnSuccessListener(
                            new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void v) {
                                    // Model downloaded successfully. Okay to start translating.
                                    // (Set a flag, unhide the translation UI, etc.)
                                    englishTranslator.translate(options.getString(IMAGE_SOURCE))
                                            .addOnSuccessListener(
                                                    new OnSuccessListener<String>() {
                                                        @Override
                                                        public void onSuccess(@NonNull String translatedText) {
                                                            // Translation successful.
                                                            callback.invoke(translatedText);
                                                        }
                                                    })
                                            .addOnFailureListener(
                                                    new OnFailureListener() {
                                                        @Override
                                                        public void onFailure(@NonNull Exception e) {
                                                            // Error.
                                                            // ...
                                                            Toast.makeText(getReactApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT);
                                                            callback.invoke("");
                                                        }
                                                    });
                                }
                            })
                    .addOnFailureListener(
                            new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    // Model couldn’t be downloaded or other internal error.
                                    // ...
                                    Toast.makeText(getReactApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT);
                                    callback.invoke("");
                                }
                            });

        } catch (Exception ex) {
            Toast.makeText(getReactApplicationContext(), ex.getMessage(), Toast.LENGTH_SHORT);
            callback.invoke("");
        }

    }
}
