#include <iostream>
#include <climits>
#include <string>
#include <cstring>
using namespace std;
/*
//recursion function
int sum(int x)
{
    if (x>0)
    {
        return x+sum(x-1);
    }
    else
    {
        return 0;
    }
}
int factorial(int x)
{
    if (x==0)
    {
        return 1;
    }
    else
    {
        return x*factorial(x-1);
    }
}
int main()
{
    int res,res2,num;
    cout<<"sayi giriniz. ";
    cin>>num;
    res=sum(num);
    res2=factorial(num);
    cout<<"result sum: "<<res<<"\n";
    cout<<"result factorial: "<<res2<<"\n";

    return 0;
}
*/
/*
int main()
{
    char str1[10]="Gulsum";
    char str2[10]="Cakmak";
    char str3[10];
    int mylength;
    strcpy(str3,str1);
    cout<<str3<<"\n";
    strcat(str1,str2);
    cout<<str1<<"\n";
    mylength=strlen(str1);
    cout<<mylength;

    return 0;
}
*/
/*
int main()
{
    string metin="hayat zor degil mi 42 ?";
    cout<<metin<<"\n";
    string str1="Sena";
    string str2="Cakmak";
    string str3;
    int length;
    // str3=str1;
    // str3=str1+" "+str2;
    str3=str1+' '+str2;
    cout<<str3<<endl;

    return 0;
}
*/
/*
int main()
{
    string x,y,z;
    x="20";
    y="40";
    z=x+y;
    cout<<z;

    return 0;
}
*/
/*
int main()
{
    string metin = "nasilsin bugun?";
    // cout<<"uzunluk: "<<metin.size()<<" \n ";
    cout << "uzunluk: " << metin.length() << " \n ";
    return 0;
}
*/
/*
int main()
{
    string fullname;
    cout<<"tam adinizi giriniz: ";
    getline(cin,fullname);//cin ile bosluk sonrasini almiyor
    if (fullname.length()<5)
    {
        cout<<"bu alan 5 karakterden daha az olamaz.\n";
        cout<<"uzunluk: "<<fullname.size()<<"\n";
    }
    else
    {
        cout<<"adiniz:"<<fullname<<"\n";
    }
    
    return 0;
}
*/
