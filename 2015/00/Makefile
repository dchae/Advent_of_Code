# Compiler and flags
CXX = clang++
# Alternative: CXX = g++-14 (if you have multiple gcc versions)
CXXFLAGS = -std=c++23 -Wall -Wextra -Wpedantic -Wshadow
# CXXFLAGS = -std=c++17 -Wall -Wextra

# Project files
TARGET = main
SRC = main.cpp
# If you have multiple source files:
# SRC = main.cpp file1.cpp file2.cpp

# Build the executable
$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SRC)

# Run the program
run: $(TARGET)
	./$(TARGET)

# Clean build files
clean:
	rm -f $(TARGET)

# Default target
.PHONY: all clean run brun
all: $(TARGET)
