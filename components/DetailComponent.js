import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, Pressable, Linking, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarker, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons"
import CustButton from './Button';
import { ImagePlaceHolder, favouriteKey ,redColor} from "../Const/Const";
import MyStorageManager from '../Helper/Storage_Helper';
import CustomToast from "../Widgets/CustomToast";
import { useState } from "react";
import Utilities from '../Helper/Utils';

export default DetailComponent = (props) => {

    // Got item from previous page to use in this page
    const item = props.route.params.item;

    // if coverImg or Logourl Null or empty it will replace it with my hard coded image
    const coverImg = item?.coverImageUrl?.length > 1 ? item.coverImageUrl : ImagePlaceHolder;
    const logoUrl = item?.logoUrl?.length > 1 ? item.logoUrl : ImagePlaceHolder;


    // My Toast Var
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Toast working");
    const [isFavourite, setFavourite] = useState(false);

    useEffect(() => {
        // Checking current number of items in storage
        storageManager.loadArray().then((e) => {

            // storageManager.removeEverythingFromDb();

            const isExist = Utilities.isItemExistInList(item, e);
            setFavourite(isExist);
        });

    }, [])


    // Created instance for Storage manager
    const storageManager = new MyStorageManager(favouriteKey);



    // Opening web browser on donate button click
    function openInChrome() {
        Linking.openURL(item.profileUrl)
            .then(() => {
                console.log("Opened in browser")
            })
            .catch((error) => {
                console.error('Error opening URL: ', error);
            });
    }

    // Toast Method 
    function showToastMethod(myMsg) {
        setToastMessage(myMsg);
        setShowToast(!showToast);
    }
    function removeItem(myParamList, paramItem) {
        const updatedItems = myParamList.filter((item) => paramItem.ein !== item.ein);
        storageManager.saveArray(updatedItems);
    }

    // Save New Item to local storage 
    async function saveFavourite() {
        try {
            storageManager.loadArray().then((e) => {

                if (isFavourite) {
                    removeItem(e, item);
                } else {
                    if (e == null || e.length < 1) {
                        const myArr = [];
                        myArr.push(item)
                        storageManager.saveArray(myArr);
                    } else {
                        const data = JSON.stringify(e)
                        const myArr = JSON.parse(data)
                        const isExist = Utilities.isItemExistInList(item, myArr);
                        if (isExist) {
                            showToastMethod("Already favourite!");
                            return
                        } else {
                            myArr.push(item)
                            storageManager.saveArray(myArr)
                        }
                    }
                }
                setFavourite(!isFavourite)
            });
        } catch (error) {
            console.error('Error saving item list:', error);
        }

    }

    return (
        <View style={styles.mainView}>
            <Image style={styles.coverImage} source={{ uri: coverImg }} />

            <View style={styles.bottomView}>
                <View style={styles.profileTitle}>
                    <Image style={styles.profileImage} source={{ uri: logoUrl }} />
                    <Text style={styles.myTitle}>{item.name}</Text>
                </View>
                <View style={styles.divider}></View>

                <View style={styles.locationView}>
                    <View style={styles.innerLocationView}>
                        <FontAwesomeIcon color={redColor} size={15} icon={faMapMarker} />
                        <Text style={styles.locationTitle}>{item.location}</Text>
                    </View>
                    <Pressable onPress={saveFavourite}>
                        {isFavourite ? (<FontAwesomeIcon color={redColor} size={18} icon={faHeart} />)
                            : (<FontAwesomeIcon color={redColor} size={18} icon={heartRegular} />)

                        }
                    </Pressable>
                </View>
                {item?.description?.length > 1
                    ?
                    (
                        <Text style={styles.descriptionStyle}>{item.description}</Text>
                    ) : (<View></View>)

                }
                <View style={styles.btnView}><CustButton onPress={openInChrome} title="Donate" /></View>
            </View>

            <CustomToast message={toastMessage} visible={showToast} />

        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        margin: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    coverImage: {
        height: 300,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    bottomView: {
        padding: 20,
    },
    profileTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        height: 50,
        width: 50,
    },
    myTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 13,
        width: '80%',
    },
    divider: {
        height: 1,
        backgroundColor: '#eaeaea',
        marginVertical: 3,
    },
    locationView: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    innerLocationView: {
        flexDirection: "row",
    },
    locationTitle: {
        marginLeft: 10,
        width: "80%",
        fontSize: 12,

    },
    visitTitle: {
        color: 'blue',
        textDecorationLine: "underline",
    },
    descriptionStyle: {
        marginTop: 10,
        fontSize: 14,
    },
    btnView: {
        marginVertical: 15,
    }
});

