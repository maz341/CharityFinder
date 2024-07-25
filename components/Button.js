
import { Pressable, Text, StyleSheet, View } from "react-native";
import { greenColor } from "../Const/Const";

export default function CustButton(props) {

    const { onPress, title = 'Save' } = props;
    return (
        <Pressable onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: greenColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 3,
        width: '100%',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
