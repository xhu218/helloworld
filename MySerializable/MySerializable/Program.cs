﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;

namespace MySerializable
{
    class Program
    {
        static void Main(string[] args)
        {

            Element_source source = new Element_source();
            source.Items = new object[] { new Item { ItemId = "1" } };
            source.ItemsType = ItemChoiceType.item;


            XmlSerializer serializer = new XmlSerializer(typeof(Element_source));
            StringWriter writer = new StringWriter();
            //执行序列化并将序列化结果输出到控制台
            serializer.Serialize(writer, source);
            Console.Write(writer.ToString());

            string json = JsonConvert.SerializeObject(source);
            Console.Write(json);




            Element_source source1 = serializer.Deserialize(new StringReader(writer.ToString())) as Element_source;
            Element_source source2 = JsonConvert.DeserializeObject(json) as Element_source;

            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(Element_source));
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(json));
            //Element_source obj = (Element_source)ser.ReadObject(ms);   //ERROR

            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            //执行序列化
            string r1 = jsonSerializer.Serialize(source);

            //执行反序列化
            Element_source source3 = jsonSerializer.Deserialize<Element_source>(json);



            Console.Read();
        }
    }
}
