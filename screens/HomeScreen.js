import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { usersAction } from '../redux/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {Icon} from 'react-native-elements'

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.users.loading);
    const users = useSelector((state) => state.users.users[0]?.data);
    const [page, setpage] = useState(1);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    useEffect(() => {
        dispatch(usersAction(page))
    }, [page]);

    const loadingHandler = () => {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={"large"} color={"#FF0000"} />
            </View>
        )
    }

    const handleBackward = () => {
        if(page === 1){
            return;
        }
        else{
            setpage((prev) => prev - 1)
        }
    }

    const handleForward = () => {
        if(page === 3){
            return;
        }
        else{
            setpage((prev) => prev  + 1)
        }
    }


    


    return (
        <SafeAreaView className=" flex-1 justify-center bg-white w-full">
            <View className=" bg-black mx-4 rounded-md">
                {
                    loading ? loadingHandler() : (
                        <FlatList
                            keyExtractor={item => item.id.toString()}
                            data={users}
                            renderItem={({ item}) => {
                                return (
                                    <TouchableOpacity className=" bg-yellow-300 p-3 m-4 rounded-md" onPress={() => navigation.navigate("Detail", { itemId: item.id })}>
                                        <Text className="text-xl text-gray-600 text-center">{item.first_name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    )
                }
            </View>
            <View className="flex-row items-center my-8 justify-center">
                <TouchableOpacity className="mr-4" onPress={handleBackward}>
                    <Icon type='ant-design' name='minuscircle'  size={20}/>
                </TouchableOpacity>
                <Text className="text-xl">{page}</Text>
                <TouchableOpacity  className="ml-4" onPress={handleForward}>
                    <Icon type='ant-design' name='pluscircle' size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;