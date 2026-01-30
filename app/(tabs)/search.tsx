import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  View,
} from "react-native";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={() => Keyboard.dismiss()}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center">
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
              />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                autoFocus
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#AB8BFF"
                className="my-3"
              />
            )}
            {moviesError && (
              <View className="my-3">
                <Text className="text-red-500 text-center">
                  Error: {moviesError.message}
                </Text>
              </View>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <View className="mb-3">
                  <Text className="text-lg text-white font-bold">
                    Search results for
                    <Text className="text-accent"> '{searchQuery}'</Text>
                  </Text>
                  <Text className="text-sm text-gray-400 mt-1">
                    Found {movies.length} movie{movies.length > 1 ? "s" : ""}
                  </Text>
                </View>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5 items-center">
              <Image
                source={icons.search}
                className="size-12 mb-4"
                resizeMode="contain"
                tintColor={"#6B7280"}
              />
              <Text className="text-gray-500 text-center">
                {searchQuery.trim()
                  ? "No movies found. Please try a different search."
                  : "Start typing to search for movies."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
