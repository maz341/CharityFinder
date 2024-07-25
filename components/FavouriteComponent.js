import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, FlatList, Text, Image } from "react-native";
import { favouriteKey,blackColor } from "../Const/Const";
import MyStorageManager from '../Helper/Storage_Helper';
import { useState } from "react";
import CustCard from '../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default FavouriteComponent = ({ navigation }) => {
    const [myList, setList] = useState([]);

    const storageManager = new MyStorageManager(favouriteKey);

    useEffect(() => {
        storageManager.loadArray().then((e) => {
            setList(e)
        });
    }, [])

    function gotoNextScreen(screenName, item) {
        navigation.navigate(screenName, { item: item });
    }

    return (
        <View>
            {myList == null || myList.length < 1
                ?
                (
                    <View style={styles.mainView}>
                        <EmptyComponent />
                    </View>
                )
                :
                (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={myList}
                            style={styles.listViewStyle}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => gotoNextScreen("Details", item)}>
                                    <CustCard myJson={item} />
                                </Pressable>
                            }
                            keyExtractor={item => item.ein}
                        />
                    </View>
                )
            }
        </View>
    );

}

const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
    },
    listContainer: {
        margin: 20,
    },
    title: {
        fontSize: 16, fontWeight: "700",
        marginTop:15,
        color:blackColor,
    },
    emptyList: {
        alignItems: "center",
    },
   

});


const EmptyComponent = () =>
    <View style={styles.emptyList}>
        <FontAwesomeIcon  color={blackColor} size={40} icon={faSearch} />

        <Text style={styles.title}>No Favourites Found!</Text>
    </View>
