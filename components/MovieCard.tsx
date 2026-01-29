import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  adult,
}: Movie) => {
  // Format rating untuk tampilan bintang (1-5)
  const rating = Math.round(vote_average / 2);

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        {/* Poster Container */}
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          {/* Adult Badge */}
          {adult && (
            <View className="absolute top-2 right-2 bg-red-600 px-1.5 py-0.5 rounded">
              <Text className="text-[10px] text-white font-bold">18+</Text>
            </View>
          )}

          {/* Rating Badge */}
          <View className="absolute bottom-2 left-2 bg-dark-100/80 flex-row items-center px-1.5 py-0.5 rounded gap-x-1">
            <Image source={icons.star} className="size-3" />
            <Text className="text-[10px] text-white font-bold">
              {rating > 0 ? rating : "N/A"}
            </Text>
          </View>
        </View>

        {/* Movie Info */}
        <View className="mt-2">
          <Text className="text-sm font-bold text-white" numberOfLines={1}>
            {title}
          </Text>

          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0] || "TBA"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
