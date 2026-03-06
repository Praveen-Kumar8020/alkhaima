import java.util.*;
import java.io.*;
class Ex1
{
    public static void main(String args[])
    {
        int[] arr = {10,38,20,19,1,44,76};
        int low=0;
        int high=0;
        for(int i=0; i<arr.length; i++)
        {
            for(int j=0; j<arr.length; j++)
            {
                if(arr[i]> arr[j])
                {
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
        System.out.println("Lower Value :" + arr[arr.length-1]+ "\nGreater Value :" + arr[0]);
    }
}