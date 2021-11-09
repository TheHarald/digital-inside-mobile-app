import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: "#007AFF",
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        marginTop: 40,
        marginLeft: 16,
        fontSize: 18,
        color: 'white',
        marginEnd: 16
    },
    titleText: {
        marginTop: 90,
        marginHorizontal: 16,
        fontSize: 20
    },
    main: {
        marginTop: 17
    },
    item: {
        marginTop: 8,
        marginHorizontal: 16,
        backgroundColor: 'white',
        height: 100,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding: 16
    },
    mainText: { fontSize: 16 },
    mainBoldtext: { fontSize: 16, fontWeight: 'bold' },
    picker: {

        marginHorizontal: 8,
        borderColor: '#007AFF',
        borderRadius: 2,
        borderWidth: 1,
        borderRadius: 5
    },
    inputAdd: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#007AFF',
        backgroundColor: 'white',
        paddingVertical: 6,
        paddingLeft: 6,
        marginHorizontal: 8,
        fontSize: 17,
        marginBottom: 10

    }

});