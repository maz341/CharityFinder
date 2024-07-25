import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import {redColor}from '../Const/Const';


export default function CustCard(props) {
    const noImage = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';

    return <View style={styles.mainCard}>

        <Image
            style={styles.imageCover}
            resizeMode={"cover"}
            source={{ uri: props.myJson.coverImageUrl == null ? noImage : props.myJson.coverImageUrl }}
        />

        <View style={styles.innerView}>
            <View style={styles.firstLine}>
                <Image
                    height={35}
                    width={35}
                    style={styles.imageProfilePic}
                    source={{ uri: props.myJson.logoUrl == null ? noImage : props.myJson.logoUrl }}
                />
                <Text style={styles.title}>{props.myJson.name}</Text>

            </View>

            <View style={styles.divider}></View>
            <View style={styles.bottomItem}>
                <FontAwesomeIcon color={redColor} icon={faLocationPin} />
                <Text style={styles.locationTitle}>{props.myJson.location}</Text>
            </View>

        </View>
    </View>
}

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor:'white',
        borderRadius: 20,
        marginVertical: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    innerView: {
        marginTop: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignContent: "flex-start",

    },
    firstLine: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    imageCover: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 130,
    },
    imageProfilePic: {
        borderRadius: 20,
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        overflow: "hidden",
        flexWrap: "wrap",
        display: "flex",
        width: '80%',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#eaeaea',
        marginVertical: 3,

    },
    bottomItem: {
        flexDirection: "row",
        paddingVertical: 10,

    }, locationTitle: {
        marginLeft: 10,
    }
});