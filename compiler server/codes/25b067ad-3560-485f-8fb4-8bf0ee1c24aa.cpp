#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to find two indices whose values sum to target
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value -> index
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {}; // Return empty if no solution found
}

int main() {
    int n, target;
    cin >> n; // size of the vector
    vector<int> nums(n);

    for (int i = 0; i < n; ++i)
        cin >> nums[i];

    cin >> target;

    vector<int> result = twoSum(nums, target);
    if (!result.empty()) {
        cout << result[0] << " " << result[1] << endl;
    } else {
        cout << "No valid pair found." << endl;
    }

    return 0;
}
