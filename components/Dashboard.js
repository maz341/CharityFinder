import { View, StyleSheet, Image, Text, SafeAreaView, TextInput, FlatList, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'
import CustCard from "./Card";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_VERSION_PATH, API_SEARCH_PATH, API_KEY,redColor} from '../Const/Const';
import APIClient from '../Api/ApiClient';
import { debounce } from 'lodash';



const DashboardComponent = ({ navigation }) => {

    const [myList, setMyList] = useState([]);

    // To pass the base url
    const apiClient = new APIClient(API_BASE_URL);

    const DEBOUNCE_DELAY = 500;

    // Delay for half a minute and then hits the api so on every word type the api wont hit
    const debouncedFetchData = debounce(fetchDataProperly, DEBOUNCE_DELAY);

    useEffect(() => {
        fetchDataProperly("Toronto");
    }, []);

    async function fetchDataProperly(searchItem) {
        const inputText = searchItem.length < 1 ? 'Toronto' : searchItem;

        try {
            const myUrl = `${API_VERSION_PATH}${API_SEARCH_PATH}${inputText}?apiKey=${API_KEY}`;
            const response = await apiClient.get(myUrl);
            setMyList(response.nonprofits);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    function gotoNextScreen(screenName, item) {
        navigation.navigate(screenName, { item: item });
    }

    return <SafeAreaView>
        <View
            style={styles.mainView}>
            <View style={styles.favNInputField}>
                <View style={styles.inputFieldView}>
                    <FontAwesomeIcon color="#000" icon={faSearch} />
                    <TextInput
                        style={styles.inputField}
                        placeholder="Search..."
                        keyboardShouldPersistTaps
                        onChangeText={(e) => debouncedFetchData(e)}
                    ></TextInput>
                </View>
                <View style={styles.favouriteMain}>
                    <Pressable onPress={() => gotoNextScreen("Favourite")}>
                        <FontAwesomeIcon color={redColor} size={18} icon={faHeart} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={myList}

                    style={styles.listViewStyle}
                    renderItem={({ item }) =>
                        <Pressable key={item.ein} onPress={() => gotoNextScreen("Details", item)}>
                            <CustCard myJson={item} />
                        </Pressable>
                    }
                    keyExtractor={item => item.ein}

                />
            </View>

        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    mainView: {
        height: '100%',
        padding: 30,
    },
    favNInputField: {
        flexDirection: 'row',
    },
    inputFieldView: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        // marginTop: 40,
        width: '80%',
        marginBottom: 20,
        elevation: 5,
        shadowColor: "#000",
        height: 55,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    inputField: {
        marginLeft: 15,
        width: '60%',
    },
    favouriteMain: {
        backgroundColor: '#f8f8f8',
        width: '17%',
        padding: 20,
        height: 55,
        marginHorizontal: 15,
        alignItems: "center",
        borderRadius: 30,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    listContainer: {
        display: "flex",
    },
    listViewStyle: {
        overflow: 'visible'
    }
});

export default DashboardComponent;


