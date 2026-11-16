#include <iostream>
#include <climits>
#include <string>
using namespace std;
/*
int main()
{
    std::cout << " hello world "  << std::endl;
    return 0;
}
*/
/*
// endl == \n
int main()
{
    cout << "c++ is very easy language." << endl;
    cout << "hey\n\n" ;
    cout << "this is my first c++ code." << "c++ is a high level language" << endl <<endl;

    return 0;
}
*/
/*
int main()
{
    int num;
    num=22;
    bool myBoolen=true;
    char letter='G';
    string text="c++ is wonderful";
    int x,y,z;
    x=y=z=64;
    int age=19;

    cout << "the number is: " << num << endl ;
    cout << " the number's adress is " << &num << endl;
    cout << "the letter is: " << letter << endl ;
    cout << "the text is:   " << text << "the letter is:" << letter << endl ;
    cout << " x: "<< x << "y: " << y << "z: " << z << endl;
    cout << " I am " << age << " years old\n ";

    return 0;
}
*/
/*
int main()
{
    const int num=9; // sabit değer programın bir yerinde değiştirilemez
    unsigned int mynum=8;// pozitif sayılar
    float num1=3.14;
    float num2=3.14;
    num1=static_cast<int>(7.13);
    num2=static_cast<int>(num2);

    cout << num << "\n";
    cout << mynum <<"\n";
    cout << num1 << "\n";
    cout << num2 << "\n";

    return 0;
}
*/
/*
int main()
{
    int num1,num2,sum;
    cout << "iki sayi gir:"<<"\n";
    cin >> num1 >> num2 ;
    sum = num1+num2;
    cout << "sonuc:" << sum ;
    return 0;
}
*/
/*
int main()
{
    string metin;
    cout << "metin giriniz:\n";
    getline(cin,metin);
    cout << "girdiginiz metin sudur:\n" << metin ;
    return 0;
}
*/
/*
int main()
{
    char metin[30];
    cout << " metin giriniz:\n";
    cin.getline(metin, sizeof(metin));
    cout << "girdiginiz metin sudur:\n" << metin;
    return 0;
}
*/
// birbirinden farklı birden çok if oluşturabiliriz ama bir ifin içinde tel if ve else vardır else if birden çok olabilir
/*
int main()
{
    int num1,num2;

    cout << "ilk sayiyi gir:\n";
    cin >> num1;
    cout << "ikinci sayiyi gir:\n";
    cin >> num2;

    if(num1>num2)
    {
        cout<<"buyuk sayinin kücük sayidan farki= "<<num1-num2<<endl;
    }
    else if(num1==num2)
    {
        cout<<"sayilar esittir\n";
    }
    else
    {
        cout << "buyuk sayinin kucuk sayidan farki= "<<num2-num1<<endl;
    }

    return 0;
}
*/
//   !=100 eşit değil 100
/*
int main()
{
    int num;
    string res;
    cout<<"sayi gir: ";
    cin>>num;
    //sayi >0 ise ilki değil ise ikinci
    res=(num>0)? "sayi pozitif":"sayi negatif";
    cout<<res<<"\n";

    return 0;
}
*/
/*
int main()
{
    int x,y,z,max,min;
    cout<< "3 sayi giriniz:   ";
    cin>>x>>y>>z;

    if(x>y && x>z)
    {
        max=x;
        min=(y<z)?y:z;
    }
    else if(y>z && y>x)
    {
        max=y;
        min=(x<z)?x:z;
    }
    else
    {
        max=z;
        min=(x<y)?x:y;
    }
    cout<<"max =  "<<max<<endl;
    cout<<"min =  "<<min;

    return 0;
}
*/
/*
int main()
{
    int x=8,y=12,res;
    // res = (x==7) ? 19 : ((y==12) ? 10: -7);
    switch (x)
    {
    case 7:
        res=19;
        break;
    default:switch (y)
    {
    case 12:
        res=10;
        break;

    default:
        res=-7;
        break;
    }
    }
    cout << res<<"\n";
    return 0;
}
*/
/*
int main()
{
    char letter;
    cout << "harf gir:";
    cin >> letter;
    switch (letter)
    {
    case 'a':
    case 'e':
    case 'u':
    case 'o':
    case 'i':
        cout << letter << " bir sesli harftir\n";
        break;
    default:
        cout << letter << " bir sessiz harf";
        cout << " ya da harf degildir.\n";
        break;
    }

    return 0;
}
*/
/*
int main()
{
    short int ay;
    cout << "ayin sayisini giriniz: ";
    cin >> ay;

    switch (ay)
    {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        cout<<" bu ay 31 gundur.";
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        cout<<" bu ay 30 gundur.";
        break;
    case 2:
        cout<<"bu ay 28 ya da 29 gundur.";
        break;
    default:
        cout<<"gecersiz sayi.";
        break;
    }
    return 0;
}
*/
/*
int main()
{
    short int num, i = 1;
    while (num != 0)
    {
        i=1;
        cout << "(1-10) arasi bir sayi giriniz: (cikis icin (0))";
        cin >> num;
        if (num < 0 || num > 10)
        {
            cout << "1 ile 10 arasi sayi giriniz.\n";
        }
        else
        {
            while (i <= 10 && num != 0)
            {
                cout << num << "X" << i << "=" << num * i << "\n";
                i++;
            }
        }
    }
    return 0;
}
*/
/*
int main()
{
    short int num, i = 1;
    do
    {
        i = 1;
        cout << "bir sayi giriniz: ";
        cin >> num;
        if (num < 1 || num > 50)
            break;
        while (i <= num)
        {
            cout << i << " ";
            i++;
        }
        cout << "\n";
    } while (num >= 1 && num <= 50);

    return 0;
}
*/
/*
//12345
int main()
{
    short int i;
    for (i = 1; i < 10; i++)
    {
        if (i == 6)
            break;
     cout << i << " ";
    }
    cout << "\n";
    return 0;
}
*/
/*
//12345789
int main()
{
    short int i;
    for (i = 1; i < 10; i++)
    {
        if (i == 6)
            continue;;
     cout << i << " ";
    }
    cout << "\n";
    return 0;
}
*/
/*
int main()
{
    short int i,j;
    for ( i = 1; i <= 5; i++)
    {
       for ( j=1; j <= 3; j++)
       {
            cout<<"Hello C++ ";
            if (j!=3)
            {
                cout<<"- ";
            }
       }
       cout<<"\n---------------------------------\n";
    }
    return 0;
}
*/
/*
int main()
{
    int num, i = 1;
    int min = INT_MAX, max = INT_MIN;
    cout<<"donguden cikmak icin 0 tuslayiniz."<<endl;
    do
    {
        cout << i << ". sayi: ";
        cin >> num;
        if (num == 0)
            break;
        if (num < min)
        {
            min = num;
        }
        if (num > max)
        {
            max = num;
        }
        i++;
    }
    while (num!=0);
        cout<<"\n en kucuk sayi: "<<min<<"\n";
        cout<<"\n en buyuk sayi: "<<max<<"\n";

    return 0;
}
*/
/*
int main()
{
    int i, j, num, sat, bosluk;
    cout << "satir sayisini giriniz. ";
    cin >> sat;
    for (i = 0; i < sat; i++)
    {
        for (bosluk = 1; bosluk <= sat - i; bosluk++)
        {
            cout << " ";
        }
        for (j = 0; j <= i; j++)
        {
            if (j == 0)
                num = 1;
            else
                num = num * (i - j + 1) / j;
            cout << num << " ";
        }
        cout << "\n";
    }
    cout << "\n\n";

    return 0;
}
*/
/*
void mycountry(string country="Turkey")
{
    cout<<country<<"\n";
}
int main()
{
    mycountry();//varsayialn olarak Turkeyi kullanir
    mycountry("India");
    mycountry("USA");
    mycountry("England");
    mycountry("Italy");

    return 0;
}
*/
/*
void yazdir()
{
    cout<<"toplam:";
}
int sum(int x,int y)
{
    yazdir();
    return x+y;
}
int main()
{
    int myvalue,num1=10,num2=34;
    myvalue=sum(num1,num2);
    cout<<myvalue<<"\n";

    return 0;
}
*/
/*
int main()
{
    string yemek="pizza";
    string &ogun=yemek;
    cout<<yemek<<endl;
    cout<<ogun<<endl;
    cout<<&yemek<<endl;
    cout<<&ogun<<endl;

    return 0;
}
*/
/*
void swap(int &x,int &y)
{
    int z=x;
    x=y;
    y=z;
}
int main()
{
    int ilknum=21,ikincinum=66;
    cout<<"ONCE: "<<ilknum<<"/"<<ikincinum<<endl;
    swap(ilknum,ikincinum);
    cout<<"SONRA:"<<ilknum<<"/"<<ikincinum<<endl;

    return 0;
}
*/