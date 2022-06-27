var flgfst = 1,flgkk = 0,flgdt = 0;
var way = "";
var kr = ["",""];
var inp = document.createElement;
inp.innerHTML = "";
var cnt = 0;
function calc(btn){
    var out = document.getElementById('out');
    var ans = document.getElementById('ans');
    kr[1] = btn.innerHTML;
    if (btn.innerHTML == "÷"){
        btn.innerHTML = "/";
    }else if (btn.innerHTML == "×"){
        btn.innerHTML = "*";
    }else if (btn.innerHTML == "00"){
        if(flgfst == 1){
            return;
        }
        kr[2] = btn.innerHTML;
        btn.innerHTML = "0";
        calc(btn);
        kr[1] = kr[2];
    }

    if(btn.innerHTML == "AC"){
        clear();
    }
    if(btn.innerHTML == "←"){
        if(cnt >= 1){
            cnt -= 1;
            if(cnt == 0){
                clear();
            }else if(cnt > 0){
                if(way == "("){
                    flgkk -= 1;
                }else if(way == ")"){
                    flgkk += 1;
                }
                way = inp.innerHTML.substring(cnt-1,cnt);
                inp.innerHTML = inp.innerHTML.substring(0,cnt);
                ans.innerHTML = "";
                if(flgnm(way) == 0 || flgnm(way) == 2){
                    flgfst = 1;
                }else{
                    flgfst = 0;
                }
            }
        }
        btn.innerHTML = fin();
        return;
    }

    if(cnt >= 15 && flgnm(btn.innerHTML) != 3 && btn.innerHTML != ")"){
        if(ans.innerHTML != "" && ans.innerHTML != "これ以上は入力できません" ){
            inp.innerHTML = ans.innerHTML;
        }
        ans.innerHTML = "これ以上は入力できません";
    }else{
        if(flgnm(way) == 0 && way != "." && cnt < 15){
            flgdt = 0;
        }
        if(flgnm(btn.innerHTML) == 3){
            if((way == ")" || flgnm(way) != 0) && flgkk == 0 && flgfst != 2 && inp.innerHTML != ""){
                ans.innerHTML = eval(inp.innerHTML) ;
                inp.innerHTML = renketu(inp.innerHTML,"=");
                flgfst = 2;
                flgkk = 0;
                way = btn.innerHTML;
                ans.innerHTML = dotto(btn.innerHTML,ans.innerHTML,cnt);
            }else if(flgfst == 2){
                ans.innerHTML = dotto(btn.innerHTML,ans.innerHTML,cnt);
            }
        }else if(flgfst == 2){
            if(flgnm(btn.innerHTML) != 0 || btn.innerHTML == ")" || btn.innerHTML == "("){
                btn.innerHTML = kr[1];
                return;
            }
            for(i=1;i<=ans.innerHTML.length;i++){
                cnt = i;
            }
            inp.innerHTML = ans.innerHTML;
            flgfst = 0;
            ans.innerHTML = "";
        }
        if(btn.innerHTML == "."){
            if(flgdt == 0 && flgnm(way) == 1){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                flgdt = 1;
                flgfst = 0;
                way = btn.innerHTML;
            }
        }else if(btn.innerHTML == "-" && way != btn.innerHTML){
            inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
            flgfst = 0;
            way = btn.innerHTML;
        }else if(btn.innerHTML == "("){
            if(flgnm(way) == 0 && way != ")"){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                flgkk += 1;
                flgfst = 1;
                way = btn.innerHTML;
            }
        }else if(btn.innerHTML == ")"){
            if(flgkk >= 1 && (flgnm(way) != 0 || way == ")")){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                flgkk -= 1;
                way = btn.innerHTML;
            }
        }else if((flgnm(way) != 1 || flgfst == 1) && way != ")"){
            if(btn.innerHTML == "0" && flgfst == 1){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                way = btn.innerHTML;
                flgfst = 3;
            }
            else if((flgnm(btn.innerHTML) == 1 || way ==".") && flgnm(btn.innerHTML) != 3){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                flgfst = 0;
                way = btn.innerHTML;
            }
        }else{
            if(flgnm(btn.innerHTML) == 0 && flgnm(btn.innerHTML) != 3){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                flgfst = 1;
                way = btn.innerHTML;
            }else if(flgnm(btn.innerHTML) == 1 && way != ")" && flgfst != 3){
                inp.innerHTML = renketu(inp.innerHTML,btn.innerHTML);
                way = btn.innerHTML;
            }
        }
    }
    btn.innerHTML = fin();
}

function flgnm(num){
    if(num >= "0" && num <= "9" || num =="00"){
        return 1;
    }else if(num =="."){
        return 2;
    }else if(num == "=" || num == "int"){
        return 3;
    }else{
        return 0;
    }
}

function renketu(inp,pls){
    var ren;
    ren = inp + pls;
    cnt++;
    return ren;
}

function dotto(into,search,nm){
    var dtt = 0;
    if(into == "int"){
        dtt = search.indexOf('.');
        if(dtt == -1){
            dtt = nm;
        }
        var kekka = search.substring(0,dtt);
        //let str = org.substring(0, index+1);
        return kekka;
    }else{
        return search;
    }
}

function fin(btn2){
    out.innerHTML = inp.innerHTML;
    out.innerHTML = out.innerHTML.split("*").join("×");
    out.innerHTML = out.innerHTML.split("/").join("÷");
    btn2 = kr[1];
    return btn2;
}

function clear(){
    inp.innerHTML = "";
    ans.innerHTML = "";
    way = "";
    flgfst = 1;
    flgkk = 0;
    cnt = 0;
}