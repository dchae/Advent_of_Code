#include <chrono>
#include <fstream>
#include <iostream>

template <typename F, typename... Args> void time_it(F fn, Args &&...args) {
  auto start = std::chrono::high_resolution_clock::now();
  fn(std::forward<Args>(args)...);
  auto finish = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double, std::milli> time_elapsed = finish - start;
  std::cout << time_elapsed.count() << " ms\n";
}

/*
Input:
Output:
*/

// Part 1
int part1() {
  std::cout << "Part 1:" << '\n';

  std::ifstream file("input.txt");
  std::string line;
  getline(file, line);

  int cur_floor = 0;
  for (std::string::size_type i = 0; i < line.size(); i++) {
    if (line[i] == '(')
      cur_floor++;
    if (line[i] == ')')
      cur_floor--;
  }

  std::cout << cur_floor << '\n';
  return 0;
}

// Part 2
int part2() {
  std::cout << "Part 2:" << '\n';

  std::ifstream file("input.txt");
  std::string line;
  getline(file, line);

  int cur_floor = 0;
  for (std::string::size_type i = 0; i < line.size(); i++) {
    if (line[i] == '(')
      cur_floor++;
    if (line[i] == ')')
      cur_floor--;
    if (cur_floor < 0) {
      std::cout << i + 1 << '\n';
      break;
    }
  }

  return 0;
}

int main() {
  time_it(part1);
  time_it(part2);
}
