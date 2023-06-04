import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const DetailScreen = ({route}) => {
    const itemId  = route.params.itemId;
    const users = useSelector((state) => state.users.users[0]?.data);
    const filteredDetail = users.find((user) => user.id === itemId);
    
    return (
        <View className="flex-1 justify-center bg-white w-full">
            <View className="flex-row bg-gray-400 mx-4 rounded-md px-4 py-8">
                <View className="mr-4">
                    <Image source={{uri : filteredDetail?.avatar}} className="w-[150px] h-[200px] rounded overflow-hidden" />
                </View>
                <View className="gap-3">
                    <Text className="text-lg text-white">{filteredDetail?.first_name}</Text>
                    <Text className="text-md text-white">{filteredDetail?.last_name}</Text>
                    <Text className="text-md text-red-500">{filteredDetail?.email}</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailScreen